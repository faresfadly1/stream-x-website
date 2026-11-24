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

test('quiet speech opens the gate instead of being dropped', () => {
    const encoder = new Encoder(16000);
    const [packet] = encoder.push(new Float32Array(320).fill(0.005));
    assert.equal(packet.speaking,true);
    assert.ok(packet.pcm.some(value => Math.abs(Encoder.decodeMuLaw(value)) > 0.002));
});

for(const rate of [44100,48000,96000]) {
    test(`continuous ${rate} Hz input preserves exact sample count across block boundaries`, () => {
        const encoder = new Encoder(rate,16000,1000);
        let count=0;
        for(let start=0;start<rate;start+=128) {
            const input=new Float32Array(Math.min(128,rate-start)).fill(0.1);
            for(const {pcm,speaking} of encoder.push(input)) {
                assert.equal(speaking,true);count+=pcm.length;
                assert.ok(pcm.every(v=>v>=0&&v<=255));
            }
        }
        assert.equal(count,16000);
    });
}

test('gate has a soft attack, holds word gaps, and shuts off after silence', () => {
    const encoder = new Encoder(16000);
    const [voice]=encoder.push(new Float32Array(320).fill(0.1));
    assert.equal(voice.speaking,true);assert.ok(Math.abs(Encoder.decodeMuLaw(voice.pcm[0]))<0.01);
    assert.ok(Encoder.decodeMuLaw(voice.pcm[200])>0.08);
    const [gap]=encoder.push(new Float32Array(320).fill(0.001));
    assert.equal(gap.speaking,false);assert.ok(gap.pcm.some(v=>Encoder.decodeMuLaw(v)>0));
    for(let i=0;i<15;i++) encoder.push(new Float32Array(320));
    assert.equal(encoder.push(new Float32Array(320)).length,0);
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
    assert.equal(packets.length,4);assert.equal(packets[0].speaking,true);
    assert.equal(packets[0].data.byteLength,320);
    assert.ok(output.every(v=>v===0));
});
