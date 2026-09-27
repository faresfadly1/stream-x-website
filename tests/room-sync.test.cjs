const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const RoomPlaybackSync = require('../room-sync.js');
const RoomVoiceEncoder = require('../room-audio.js');

test('playback follows elapsed time, not differently set device clocks', () => {
    let elapsed = 0;
    const a = new RoomPlaybackSync(() => elapsed);
    const b = new RoomPlaybackSync(() => elapsed + 3600000);
    const snapshot = {playing:true,currentTime:42,volume:80,updatedAt:1700000000000};
    a.receive(snapshot, 50);
    b.receive(snapshot, 50);
    elapsed += 2300;
    assert.ok(Math.abs(a.target().currentTime - 44.35) < 0.000001);
    assert.deepEqual(a.target(), b.target());
});

test('an older snapshot cannot undo a newer pause', () => {
    const sync = new RoomPlaybackSync(() => 0);
    sync.receive({playing:false,currentTime:90,volume:80,updatedAt:200});
    assert.equal(sync.receive({playing:true,currentTime:0,volume:100,updatedAt:100}), false);
    assert.equal(sync.target().playing, false);
    assert.equal(sync.target().currentTime, 90);
});

function room() {
    let now = 1000;
    const callbacks = {}, timers = [], sent = [], windowEvents = {};
    const elements = new Map();
    const element = key => {
        if (!elements.has(key)) elements.set(key, {
            style:{}, classList:{toggle(){},add(){},remove(){},contains(){return false;}},
            value:'', textContent:'', innerHTML:'', hidden:false,
            setAttribute(){},appendChild(){},append(){},remove(){},addEventListener(){},
            querySelector(selector){return element(key+selector);},closest(){return element('button');}
        });
        return elements.get(key);
    };
    const socket = {id:'test',connected:true,on:(name,callback)=>{callbacks[name]=callback;},
        emit:(...args)=>sent.push(args)};
    const player = {
        time:0,volume:100,code:5,muted:false,commands:[],
        getCurrentTime(){return this.time;},getVolume(){return this.volume;},isMuted(){return this.muted;},
        getPlayerState(){return this.code;},
        seekTo(time){this.time=time;this.commands.push(['seek',time]);},
        cueVideoById({startSeconds}){this.time=startSeconds;this.code=5;this.commands.push(['cue',startSeconds]);},
        setVolume(volume){this.volume=volume;this.commands.push(['volume',volume]);},
        mute(){this.muted=true;},unMute(){this.muted=false;},destroy(){},
        playVideo(){this.code=1;this.commands.push(['play']);this.events.onStateChange({data:1});},
        pauseVideo(){this.code=2;this.commands.push(['pause']);this.events.onStateChange({data:2});}
    };
    const sandbox = {
        console,URL,URLSearchParams,Uint32Array,Int16Array,Float32Array,ArrayBuffer,Map,Set,RoomVoiceEncoder,
        RoomPlaybackSync: class extends RoomPlaybackSync {constructor(){super(()=>now);}},
        performance:{now:()=>now},
        location:{hostname:'localhost',search:'?room=regression-test',pathname:'/room.html'},
        history:{replaceState(){}},localStorage:{getItem(){return 'Tester';},setItem(){}},
        navigator:{},document:{hidden:false,body:element('body'),
            getElementById:element,querySelector:element,querySelectorAll:()=>[],addEventListener(){},createElement:element},
        setInterval:(callback,delay)=>{timers.push({callback,delay});return timers.length;},clearInterval(){},
        setTimeout(){},clearTimeout(){},
        io:()=>socket,
        YT:{PlayerState:{PLAYING:1,PAUSED:2,BUFFERING:3,ENDED:0},Player:function(id,options){player.events=options.events;return player;}},
        matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener:(name,fn)=>windowEvents[name]=fn
    };
    sandbox.window=sandbox;
    const html=fs.readFileSync(path.join(__dirname,'../room.html'),'utf8');
    const script=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].find(m=>!m[1].includes('src=')&&!m[1].includes('text/plain'))[2];
    const context=vm.createContext(sandbox);
    vm.runInContext(script,context);
    const snapshot=(overrides={})=>({playing:false,currentTime:0,volume:100,updatedAt:now,...overrides});
    const state=(playback)=>callbacks['room-state']({users:[],chatHistory:[],media:{type:'youtube',videoId:'M7lc1UVf-VE'},playback});
    return {player,sent,timers,windowEvents,snapshot,state,callbacks,
        tick(ms){now+=ms;},ready(){player.events.onReady();},
        run(code){return vm.runInContext(code,context);},
        actions(){return sent.filter(([event])=>event==='playback-action');}};
}

test('latest pause/seek received while iframe loads wins on ready', () => {
    const r=room();
    r.state(r.snapshot({playing:true,currentTime:10}));
    r.tick(100);
    r.callbacks['playback-action']({type:'pause',playback:r.snapshot({currentTime:80})});
    r.ready();
    assert.equal(r.player.time,80);
    assert.equal(r.player.code,5);
    assert.equal(r.actions().length,0);
});

test('remote play/pause do not echo; an immediate opposite user action is sent', () => {
    const r=room();r.state(r.snapshot());r.ready();
    r.tick(100);
    r.callbacks['playback-action']({type:'play',playback:r.snapshot({playing:true})});
    assert.equal(r.player.code,1);
    assert.equal(r.actions().length,0);
    r.player.pauseVideo();
    assert.equal(r.actions().length,1);
    assert.equal(r.actions()[0][1].type,'pause');
    r.tick(20);r.player.playVideo();
    assert.equal(r.actions().length,2);
    assert.equal(r.actions()[1][1].type,'play');
});

test('in-sync snapshots do not issue seek/play/pause commands', () => {
    const r=room();r.state(r.snapshot());r.ready();
    r.player.commands=[];
    r.tick(2000);r.state(r.snapshot());
    assert.deepEqual(r.player.commands,[]);
});

test('refresh follows the shared pause without broadcasting a resume', () => {
    const r=room();r.state(r.snapshot({currentTime:67,playing:false}));r.ready();
    assert.equal(r.player.time,67);
    assert.equal(r.player.code,5);
    assert.equal(r.actions().length,0);
    r.windowEvents.beforeunload();r.player.playVideo();
    assert.equal(r.actions().length,0);
});

test('paused seek, remote seek, and volume changes propagate without loops', () => {
    const r=room();r.state(r.snapshot());r.ready();
    r.run('monitorYouTubePlayback()');
    r.tick(200);r.player.time=30;r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().at(-1)[1].type,'seek');
    const count=r.actions().length;
    r.tick(100);
    r.callbacks['playback-action']({type:'seek',playback:r.snapshot({currentTime:70,volume:25})});
    r.tick(200);r.run('monitorYouTubePlayback()');
    assert.equal(r.player.time,70);
    assert.equal(r.player.volume,25);
    assert.equal(r.actions().length,count);
    r.player.volume=50;r.tick(200);r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().at(-1)[1].type,'volume');
    assert.equal(r.actions().at(-1)[1].volume,50);
});

test('background timer delays are not broadcast as seeks', () => {
    const r=room();r.state(r.snapshot({playing:true}));r.ready();
    r.run('monitorYouTubePlayback()');
    r.tick(12000);r.player.time=2;r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().length,0);
});

test('a user can immediately restore the volume that preceded a remote change', () => {
    const r=room();r.state(r.snapshot());r.ready();
    r.tick(100);r.callbacks['playback-action']({type:'volume',playback:r.snapshot({volume:25})});
    r.run('monitorYouTubePlayback()');
    r.player.volume=100;r.tick(200);r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().length,1);
    assert.equal(r.actions()[0][1].volume,100);
});

test('periodic paused snapshots allow local play to finish buffering', () => {
    const r=room();r.state(r.snapshot());r.ready();r.player.commands=[];
    r.player.code=3;r.tick(2000);r.state(r.snapshot());
    assert.equal(r.player.commands.length,0);
    r.player.playVideo();
    assert.equal(r.actions().length,1);
    assert.equal(r.actions()[0][1].type,'play');
});

test('an explicit remote pause still interrupts buffering immediately', () => {
    const r=room();r.state(r.snapshot({playing:true}));r.ready();r.player.code=3;
    r.tick(100);r.callbacks['playback-action']({type:'pause',playback:r.snapshot()});
    assert.equal(r.player.code,2);
    assert.equal(r.actions().length,0);
});

test('speech ducks only the local output and restores the original shared volume', () => {
    const r=room();r.state(r.snapshot({volume:80}));r.ready();
    r.run("noteSpeech('friend')");
    assert.equal(r.player.volume,20);
    r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().length,0);
    r.tick(700);r.run('updateFilmDucking(); monitorYouTubePlayback()');
    assert.equal(r.player.volume,80);
    assert.equal(r.actions().length,0);
});

test('overlapping speakers hold ducking until the last person stops', () => {
    const r=room();r.state(r.snapshot());r.ready();
    r.run("noteSpeech('local')");r.tick(400);r.run("noteSpeech('friend')");
    r.tick(300);r.run('updateFilmDucking()');assert.equal(r.player.volume,25);
    r.tick(400);r.run('updateFilmDucking()');assert.equal(r.player.volume,100);
});

test('a new shared volume during speech is restored after silence, including mute', () => {
    const r=room();r.state(r.snapshot());r.ready();r.run("noteSpeech('friend')");
    r.tick(100);r.callbacks['playback-action']({type:'volume',playback:r.snapshot({volume:40})});
    assert.equal(r.player.volume,10);r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().length,0);
    r.tick(700);r.run('updateFilmDucking(); monitorYouTubePlayback()');
    assert.equal(r.player.volume,40);assert.equal(r.actions().length,0);
    r.player.muted=true;r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().at(-1)[1].volume,0);
    r.run("noteSpeech('friend')");r.tick(700);r.run('updateFilmDucking()');
    assert.equal(r.player.muted,true);assert.equal(r.run('playerVolume()'),0);
});

test('manual volume while ducked stays a shared user action, not a ducking echo', () => {
    const r=room();r.state(r.snapshot());r.ready();r.run("noteSpeech('friend'); monitorYouTubePlayback()");
    r.player.volume=10;r.tick(200);r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().at(-1)[1].volume,40);
    r.tick(800);r.run('updateFilmDucking(); monitorYouTubePlayback()');
    assert.equal(r.player.volume,40);assert.equal(r.actions().length,1);
});

test('a delayed volume API response does not cancel ducking or emit a false action', () => {
    const r=room();r.state(r.snapshot());r.ready();
    r.player.setVolume=function(volume){this.pendingVolume=volume;};
    r.run("noteSpeech('friend'); monitorYouTubePlayback()");
    assert.equal(r.actions().length,0);
    r.player.volume=r.player.pendingVolume;r.tick(200);r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().length,0);
    r.tick(700);r.run('updateFilmDucking(); monitorYouTubePlayback()');
    assert.equal(r.actions().length,0);assert.equal(r.player.pendingVolume,100);
});

test('buffer stalls never broadcast a rewind to everyone', () => {
    const r=room();r.state(r.snapshot({playing:true,currentTime:10}));r.ready();
    r.run('monitorYouTubePlayback()');r.tick(1000);r.run('monitorYouTubePlayback()');
    assert.equal(r.actions().length,0);
});

test('routine drift checks do not rewind one second or seek again while settling', () => {
    const r=room();r.state(r.snapshot({playing:true,currentTime:10}));r.ready();
    r.tick(2500);r.player.time=13.5;r.player.commands=[];r.state(r.snapshot({playing:true,currentTime:12.5}));
    assert.equal(r.player.commands.filter(([type])=>type==='seek').length,0);
    r.tick(2000);r.player.time=13.5;r.state(r.snapshot({playing:true,currentTime:16}));
    assert.equal(r.player.commands.filter(([type])=>type==='seek').length,1);
    r.tick(200);r.player.time=13.5;r.state(r.snapshot({playing:true,currentTime:16.2}));
    assert.equal(r.player.commands.filter(([type])=>type==='seek').length,1);
});

test('volume commands never seek or restart a buffering player', () => {
    const r=room();r.state(r.snapshot({playing:true}));r.ready();r.player.code=3;r.player.commands=[];
    r.tick(4000);r.callbacks['playback-action']({type:'volume',playback:r.snapshot({playing:true,currentTime:4,volume:50})});
    assert.deepEqual(r.player.commands,[['volume',50]]);
});

test('a microphone-off listener plays incoming speech and ducks the film without sending actions', () => {
    const r=room();r.state(r.snapshot());r.ready();
    r.run(`
        state.voice.relay.context = {
            state:'running',currentTime:0,
            createBuffer(channels,length,rate){return {duration:length/rate,getChannelData(){return new Float32Array(length);}};},
            createBufferSource(){return {connect(){},disconnect(){},start(){state.testVoicePlayed=true;}};},
            createDynamicsCompressor(){return {threshold:{},knee:{},ratio:{},attack:{},release:{},connect(){}};}
        };
        playRelayedVoice('friend',new Int16Array(1024).fill(6000).buffer);
        monitorYouTubePlayback();
    `);
    assert.equal(r.run('state.voice.enabled'),false);
    assert.equal(r.run('state.testVoicePlayed'),true);
    assert.equal(r.player.volume,25);assert.equal(r.actions().length,0);
    r.tick(1000);r.run('updateFilmDucking(); monitorYouTubePlayback()');
    assert.equal(r.player.volume,100);assert.equal(r.actions().length,0);
});
