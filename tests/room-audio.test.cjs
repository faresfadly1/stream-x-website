const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const Encoder = require('../room-audio.js');

test('silence and low-level hiss send no audio packets', () => {
    const encoder = new Encoder(48000);
    for(let block=0;block<100;block++) {
        const input=Float32Array.from({length:2048},(_,i)=>Math.sin(i)*0.001);
        assert.equal(encoder.push(input).length,0);
    }
});

for(const rate of [44100,48000,96000]) {
    test(`continuous ${rate} Hz input preserves exact sample count across block boundaries`, () => {
        const encoder = new Encoder(rate,24000,1000);
        let count=0;
        for(let start=0;start<rate;start+=128) {
            const input=new Float32Array(Math.min(128,rate-start)).fill(0.1);
            for(const {pcm,speaking} of encoder.push(input)) {
                assert.equal(speaking,true);count+=pcm.length;
                assert.ok(pcm.every(v=>v>=0&&v<=3277));
            }
        }
        assert.equal(count,24000);
    });
}

test('gate has a soft attack, holds word gaps, and shuts off after silence', () => {
    const encoder = new Encoder(24000);
    const [voice]=encoder.push(new Float32Array(1024).fill(0.1));
    assert.equal(voice.speaking,true);assert.ok(voice.pcm[0]<100);
    assert.ok(voice.pcm[200]>3200);
    const [gap]=encoder.push(new Float32Array(1024).fill(0.001));
    assert.equal(gap.speaking,false);assert.ok(gap.pcm.some(v=>v>0));
    for(let i=0;i<15;i++) encoder.push(new Float32Array(1024));
    assert.equal(encoder.push(new Float32Array(1024)).length,0);
});

test('worklet uses the same encoder and transfers speech without monitoring the microphone', () => {
    let Processor;
    const packets=[];
    const context={RoomVoiceEncoder:Encoder,sampleRate:48000,
        AudioWorkletProcessor:class{constructor(){this.port={postMessage:p=>packets.push(p)};}},
        registerProcessor:(name,ctor)=>{assert.equal(name,'room-voice');Processor=ctor;}};
    const code=fs.readFileSync(path.join(__dirname,'../room-voice-processor.js'),'utf8').replace(/^import .*;\n/m,'');
    vm.runInNewContext(code,context);
    const processor=new Processor();
    const output=new Float32Array(128);
    for(let i=0;i<32;i++) assert.equal(processor.process([[new Float32Array(128).fill(0.1)]],[[output]]),true);
    assert.equal(packets.length,2);assert.equal(packets[0].speaking,true);
    assert.equal(packets[0].data.byteLength,2048);
    assert.ok(output.every(v=>v===0));
});
