// Playback positions use elapsed monotonic time, never the viewer's wall clock.
// This works with the room service's existing playback snapshots.
(function (root) {
    class RoomPlaybackSync {
        constructor(now = () => performance.now()) {
            this.now = now;
            this.reset();
        }

        reset() {
            this.playback = null;
            this.receivedAt = this.now();
            this.serverTime = -Infinity;
        }

        receive(playback, transitMs = 0) {
            if (!playback || !Number.isFinite(playback.currentTime)) return false;
            if (Number.isFinite(playback.updatedAt) && playback.updatedAt < this.serverTime) return false;
            if (Number.isFinite(playback.updatedAt)) this.serverTime = playback.updatedAt;
            this.playback = {
                playing: Boolean(playback.playing),
                currentTime: Math.max(0, playback.currentTime) + (playback.playing ? Math.max(0, Math.min(500, transitMs)) / 1000 : 0),
                volume: Math.max(0, Math.min(100, Number(playback.volume) || 0))
            };
            this.receivedAt = this.now();
            return true;
        }

        target() {
            if (!this.playback) return null;
            return {
                ...this.playback,
                currentTime: this.playback.currentTime + (this.playback.playing ? Math.max(0, this.now() - this.receivedAt) / 1000 : 0)
            };
        }

        matches(type, current) {
            const target = this.target();
            if (!target) return false;
            if (type === 'play') return target.playing;
            if (type === 'pause') return !target.playing;
            if (type === 'volume') return Math.abs(target.volume - current.volume) < 1;
            return type === 'seek' && Math.abs(target.currentTime - current.currentTime) < 0.65;
        }

        local(type, current) {
            const target = this.target() || { playing: false, currentTime: 0, volume: 100 };
            if (type === 'play' || type === 'pause') {
                target.playing = type === 'play';
                target.currentTime = current.currentTime;
            }
            if (type === 'seek') target.currentTime = current.currentTime;
            if (type === 'volume') target.volume = current.volume;
            this.playback = target;
            this.receivedAt = this.now();
        }
    }

    if (typeof module !== 'undefined' && module.exports) module.exports = RoomPlaybackSync;
    else root.RoomPlaybackSync = RoomPlaybackSync;
})(typeof window !== 'undefined' ? window : globalThis);
