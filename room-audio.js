// Shared by the audio worklet and its compatibility fallback. No movie audio
// passes through this processor: it only processes the microphone.
(function (root) {
    class RoomVoiceEncoder {
        constructor(inputRate, outputRate = 16000, blockSize = 320) {
            this.ratio = inputRate / outputRate;
            this.outputRate = outputRate;
            this.blockSize = blockSize;
            this.weight = 0;
            this.sum = 0;
            this.block = [];
            this.noise = 0.001;
            this.hold = 0;
            this.gain = 0;
        }

        encode(block) {
            const rms = Math.sqrt(block.reduce((sum, value) => sum + value * value, 0) / block.length);
            const threshold = Math.max(0.007, Math.min(0.025, this.noise * 3));
            const speaking = rms > (this.hold > 0 ? threshold * 0.65 : threshold);
            if (speaking) this.hold = this.outputRate * 0.25;
            else {
                this.hold = Math.max(0, this.hold - block.length);
                if (!this.hold) this.noise += (Math.min(rms, 0.008) - this.noise) * 0.03;
            }
            const target = this.hold > 0 ? 1 : 0;
            if (!target && this.gain === 0) return null;
            // G.711 μ-law keeps speech intelligible while cutting relay
            // bandwidth from 256–384 kbps raw PCM to 128 kbps at 16 kHz.
            const pcm = new Uint8Array(block.length);
            for (let i = 0; i < block.length; i++) {
                // Soft attack/release avoids clicks when the noise gate opens.
                const step = 1 / (this.outputRate * (target ? 0.005 : 0.06));
                this.gain = target ? Math.min(1, this.gain + step) : Math.max(0, this.gain - step);
                pcm[i] = encodeMuLaw(block[i] * this.gain);
            }
            return { pcm, speaking };
        }

        push(input) {
            const packets = [];
            // Preserve the fractional sample position between callbacks. In
            // particular, 44.1 kHz must not lose a sample at every block edge.
            for (const value of input) {
                let remaining = 1;
                while (remaining > 1e-8) {
                    const take = Math.min(remaining, this.ratio - this.weight);
                    this.sum += value * take;
                    this.weight += take;
                    remaining -= take;
                    if (this.weight >= this.ratio - 1e-8) {
                        this.block.push(this.sum / this.ratio);
                        this.sum = 0;
                        this.weight = 0;
                        if (this.block.length === this.blockSize) {
                            const packet = this.encode(this.block);
                            if (packet) packets.push(packet);
                            this.block = [];
                        }
                    }
                }
            }
            return packets;
        }
    }

    function encodeMuLaw(value) {
        const bias = 0x84;
        const clip = 32635;
        let sample = Math.round(Math.max(-1, Math.min(1, value)) * 32768);
        const sign = sample < 0 ? 0x80 : 0;
        if (sample < 0) sample = -sample;
        sample = Math.min(sample, clip) + bias;
        let exponent = 7;
        for (let mask = 0x4000; exponent > 0 && (sample & mask) === 0; mask >>= 1) exponent -= 1;
        const mantissa = (sample >> (exponent + 3)) & 0x0f;
        return (~(sign | (exponent << 4) | mantissa)) & 0xff;
    }

    function decodeMuLaw(value) {
        const sample = (~value) & 0xff;
        let magnitude = ((sample & 0x0f) << 3) + 0x84;
        magnitude <<= (sample & 0x70) >> 4;
        return ((sample & 0x80) ? (0x84 - magnitude) : (magnitude - 0x84)) / 32768;
    }

    RoomVoiceEncoder.decodeMuLaw = decodeMuLaw;
    root.RoomVoiceEncoder = RoomVoiceEncoder;
    root.decodeRoomVoiceSample = decodeMuLaw;
    if (typeof module !== 'undefined' && module.exports) module.exports = RoomVoiceEncoder;
})(typeof window !== 'undefined' ? window : globalThis);
