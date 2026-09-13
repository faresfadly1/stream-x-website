const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const allowedOrigins = new Set([
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://faresfadly1.github.io'
]);
const io = new Server(server, {
    cors: {
        origin(origin, callback) { callback(null, !origin || allowedOrigins.has(origin)); },
        methods: ['GET', 'POST']
    }
});

app.get('/health', (_request, response) => response.json({ ok: true, service: 'stream-x-watch-together' }));
app.use(express.static(path.join(__dirname)));

const rooms = new Map();
const ROOM_ID_PATTERN = /^[a-zA-Z0-9_-]{6,80}$/;

function cleanRoomId(value) {
    return typeof value === 'string' && ROOM_ID_PATTERN.test(value) ? value : null;
}

function cleanName(value) {
    return typeof value === 'string' && value.trim() ? value.trim().slice(0, 32) : 'Guest';
}

function cleanMedia(value) {
    if (!value || typeof value !== 'object') return null;
    if (value.type === 'youtube' && /^[a-zA-Z0-9_-]{11}$/.test(value.videoId || '')) {
        return { type: 'youtube', videoId: value.videoId };
    }
    if (value.type === 'video' && typeof value.url === 'string' && value.url.length <= 2000) {
        try {
            const url = new URL(value.url);
            if (['http:', 'https:'].includes(url.protocol)) return { type: 'video', url: url.href };
        } catch (_) { /* Invalid URLs are rejected. */ }
    }
    return null;
}

function cleanNumber(value, min, max, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
}

function createRoom() {
    return {
        users: [],
        media: null,
        playback: { playing: false, currentTime: 0, volume: 100, updatedAt: Date.now() }
    };
}

function currentPlayback(room) {
    const playback = { ...room.playback };
    if (playback.playing) playback.currentTime += (Date.now() - playback.updatedAt) / 1000;
    playback.updatedAt = Date.now();
    return playback;
}

function publishRoomState(roomId, room) {
    io.to(roomId).emit('room-state', {
        users: room.users,
        media: room.media,
        playback: currentPlayback(room)
    });
}

io.on('connection', (socket) => {
    socket.on('join-room', (requestedRoomId, requestedName) => {
        const roomId = cleanRoomId(requestedRoomId);
        if (!roomId) return socket.emit('room-error', 'This room link is invalid. Create a new room and try again.');

        if (!rooms.has(roomId)) rooms.set(roomId, createRoom());
        const room = rooms.get(roomId);
        socket.data.roomId = roomId;
        socket.data.username = cleanName(requestedName);
        socket.join(roomId);
        room.users = room.users.filter((user) => user.id !== socket.id);
        room.users.push({ id: socket.id, username: socket.data.username });
        publishRoomState(roomId, room);
        socket.to(roomId).emit('notice', `${socket.data.username} joined the room`);
    });

    socket.on('media-change', (media) => {
        const room = rooms.get(socket.data.roomId);
        const safeMedia = cleanMedia(media);
        if (!room || !safeMedia) return;
        room.media = safeMedia;
        room.playback = { playing: false, currentTime: 0, volume: 100, updatedAt: Date.now() };
        io.to(socket.data.roomId).emit('media-change', { media: room.media, playback: room.playback });
    });

    socket.on('clear-media', () => {
        const room = rooms.get(socket.data.roomId);
        if (!room) return;
        room.media = null;
        room.playback = { playing: false, currentTime: 0, volume: 100, updatedAt: Date.now() };
        io.to(socket.data.roomId).emit('media-change', { media: null, playback: room.playback });
    });

    socket.on('playback-action', (action) => {
        const room = rooms.get(socket.data.roomId);
        if (!room || !action || typeof action !== 'object') return;
        const type = action.type;
        if (!['play', 'pause', 'seek', 'volume'].includes(type)) return;

        const previous = currentPlayback(room);
        const next = { ...previous, updatedAt: Date.now() };
        if (type === 'play') next.playing = true;
        if (type === 'pause') next.playing = false;
        if (type === 'play' || type === 'pause') {
            next.currentTime = cleanNumber(action.currentTime, 0, 86400, previous.currentTime);
        }
        if (type === 'seek') next.currentTime = cleanNumber(action.currentTime, 0, 86400, previous.currentTime);
        if (type === 'volume') next.volume = cleanNumber(action.volume, 0, 100, previous.volume);
        room.playback = next;
        socket.to(socket.data.roomId).emit('playback-action', { type, playback: next });
    });

    socket.on('request-sync', () => {
        const room = rooms.get(socket.data.roomId);
        if (room) socket.emit('room-state', { users: room.users, media: room.media, playback: currentPlayback(room) });
    });

    socket.on('chat-message', (message) => {
        const room = rooms.get(socket.data.roomId);
        const text = typeof message === 'string' ? message.trim().slice(0, 500) : '';
        if (!room || !text) return;
        io.to(socket.data.roomId).emit('chat-message', { username: socket.data.username, message: text, timestamp: new Date().toISOString() });
    });

    socket.on('disconnect', () => {
        const roomId = socket.data.roomId;
        const room = rooms.get(roomId);
        if (!room) return;
        room.users = room.users.filter((user) => user.id !== socket.id);
        if (room.users.length === 0) rooms.delete(roomId);
        else {
            publishRoomState(roomId, room);
            io.to(roomId).emit('notice', `${socket.data.username || 'A guest'} left the room`);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Stream X Watch Together listening on port ${PORT}`));
