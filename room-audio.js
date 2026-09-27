// Shared by the audio worklet and its compatibility fallback. No movie audio
// passes through this processor: it only processes the microphone.
(function (root) {
    class RoomVoiceEncoder {
        constructor(inputRate, outputRate = 24000, blockSize = 1024) {
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
            const pcm = new Int16Array(block.length);
            for (let i = 0; i < block.length; i++) {
                // Soft attack/release avoids clicks when the noise gate opens.
                const step = 1 / (this.outputRate * (target ? 0.005 : 0.06));
                this.gain = target ? Math.min(1, this.gain + step) : Math.max(0, this.gain - step);
                pcm[i] = Math.round(Math.max(-1, Math.min(1, block[i] * this.gain)) * 32767);
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
    root.RoomVoiceEncoder = RoomVoiceEncoder;
    if (typeof module !== 'undefined' && module.exports) module.exports = RoomVoiceEncoder;
})(typeof window !== 'undefined' ? window : globalThis);
