import './room-audio.js?v=1';

class RoomVoiceProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.encoder = new globalThis.RoomVoiceEncoder(sampleRate);
    }

    process(inputs) {
        const input = inputs[0]?.[0];
        if (input) {
            for (const { pcm, speaking } of this.encoder.push(input)) {
                this.port.postMessage({ data: pcm.buffer, speaking }, [pcm.buffer]);
            }
        }
        // Output remains silent: never play the user's mic back to them.
        return true;
    }
}
registerProcessor('room-voice', RoomVoiceProcessor);
