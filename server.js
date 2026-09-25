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

// Optional server-only token from themoviedb.org. It is deliberately never sent
// to browsers: TMDB is used only for legal title discovery and official watch
// pages, not for proxying or embedding copyrighted streams.
const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN || '';
const tmdbSearchCache = new Map();
const openCatalogueCache = new Map();

// These are full-length films in the public domain. Keeping an allow-list avoids
// presenting unverified uploads as if they were licensed for streaming.
const FREE_FULL_MOVIES = [
    {
        id: 'night-of-the-living-dead', title: 'Night of the Living Dead', year: '1968',
        description: 'Horror classic · Full movie', archiveId: 'night-of-the-living-dead_202409',
        file: 'Night Of The Living Dead.mp4'
    },
    {
        id: 'his-girl-friday', title: 'His Girl Friday', year: '1940',
        description: 'Comedy · Full movie', archiveId: 'HisGirlFriday1940',
        file: 'seqhisgirlfridayfull1d_512kb.mp4'
    },
    {
        id: 'the-general', title: 'The General', year: '1926',
        description: 'Comedy · Full movie', archiveId: 'the-general-1926_202506',
        file: 'The General (1926).mp4'
    },
    {
        id: 'detour', title: 'Detour', year: '1945',
        description: 'Film noir · Full movie', archiveId: 'detour-1945', file: 'Detour 1945.mp4'
    },
    {
        id: 'last-man-on-earth', title: 'The Last Man on Earth', year: '1964',
        description: 'Sci-fi horror · Full movie', archiveId: 'the-last-man-on-earth-1964_202606',
        file: 'The Last Man on Earth -1964-.mp4'
    },
    {
        id: 'phantom-of-the-opera', title: 'The Phantom of the Opera', year: '1925',
        description: 'Silent horror · Full movie', archiveId: 'thephantomoftheopera1925_202004',
        file: 'The Phantom of the Opera 1925.ia.mp4'
    }
];

function movieStreamUrl(movie) {
    return `https://archive.org/download/${encodeURIComponent(movie.archiveId)}/${encodeURIComponent(movie.file)}`;
}

function normaliseSearch(value) {
    return String(value || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function matchesMovie(movie, query) {
    if (!query) return true;
    const searchable = normaliseSearch(`${movie.title} ${movie.year} ${movie.description}`);
    return searchable.includes(query) || query.split(' ').every((word) => searchable.includes(word));
}

function publicMovieResult(movie) {
    return {
        id: `public-${movie.id}`,
        kind: 'playable',
        title: movie.title,
        year: movie.year,
        description: movie.description,
        poster: `https://archive.org/services/img/${encodeURIComponent(movie.archiveId)}`,
        url: movieStreamUrl(movie),
        actionLabel: 'Full movie · watch together'
    };
}

async function searchTmdbMovies(query) {
    if (!TMDB_READ_ACCESS_TOKEN || query.length < 2) return [];
    const cacheKey = query.toLowerCase();
    const cached = tmdbSearchCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) return cached.results;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
        const url = new URL('https://api.themoviedb.org/3/search/movie');
        url.search = new URLSearchParams({ query, include_adult: 'false', language: 'en-US', page: '1' });
        const tmdbResponse = await fetch(url, {
            headers: { Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`, accept: 'application/json' },
            signal: controller.signal
        });
        if (!tmdbResponse.ok) return [];
        const payload = await tmdbResponse.json();
        const results = (payload.results || []).slice(0, 12).map((movie) => ({
            id: `tmdb-${movie.id}`,
            kind: 'legal-provider',
            title: movie.title || movie.original_title || 'Untitled film',
            year: (movie.release_date || '').slice(0, 4),
            description: movie.overview || 'See legitimate streaming, rent, and purchase options.',
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : '',
            watchUrl: `https://www.themoviedb.org/movie/${movie.id}/watch?locale=EG`,
            actionLabel: 'Find legal ways to watch'
        }));
        tmdbSearchCache.set(cacheKey, { results, expiresAt: Date.now() + 5 * 60 * 1000 });
        return results;
    } catch (_) {
        return [];
    } finally {
        clearTimeout(timeout);
    }
}

// Wikidata's public entity-search API needs neither an account nor an API key.
// It supplies discovery data only; copyrighted streams are never proxied by us.
async function searchOpenFilmCatalogue(query) {
    if (query.length < 2) return [];
    const cacheKey = query.toLowerCase();
    const cached = openCatalogueCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) return cached.results;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
        const url = new URL('https://www.wikidata.org/w/api.php');
        url.search = new URLSearchParams({
            action: 'wbsearchentities',
            search: query,
            language: /[\u0600-\u06FF]/.test(query) ? 'ar' : 'en',
            uselang: 'en',
            type: 'item',
            limit: '20',
            format: 'json',
            origin: '*'
        });
        const catalogueResponse = await fetch(url, {
            headers: { accept: 'application/json', 'user-agent': 'StreamX legal film discovery' },
            signal: controller.signal
        });
        if (!catalogueResponse.ok) return [];
        const payload = await catalogueResponse.json();
        const filmPattern = /\b(film|movie|animated|documentary|cinema)\b|فيلم|سينمائي/i;
        const results = (payload.search || [])
            .filter((item) => filmPattern.test(item.description || ''))
            .slice(0, 12)
            .map((item) => ({
                id: `wikidata-${item.id}`,
                kind: 'legal-provider',
                title: item.label || query,
                year: (item.description || '').match(/\b(?:18|19|20)\d{2}\b/)?.[0] || '',
                description: item.description || 'Film catalogue record',
                poster: '',
                // This is a normal provider-discovery link, not a stream or an embed.
                watchUrl: `https://www.justwatch.com/eg/search?q=${encodeURIComponent(item.label || query)}`,
                actionLabel: 'Find legal streaming options'
            }));
        openCatalogueCache.set(cacheKey, { results, expiresAt: Date.now() + 15 * 60 * 1000 });
        return results;
    } catch (_) {
        return [];
    } finally {
        clearTimeout(timeout);
    }
}

app.use((request, response, next) => {
    const origin = request.headers.origin;
    if (origin && allowedOrigins.has(origin)) response.setHeader('Access-Control-Allow-Origin', origin);
    next();
});
app.get('/health', (_request, response) => response.json({ ok: true, service: 'stream-x-watch-together' }));
app.get('/api/free-movies', (request, response) => {
    const query = normaliseSearch(request.query.q).slice(0, 80);
    const results = FREE_FULL_MOVIES
        .filter((movie) => matchesMovie(movie, query))
        .slice(0, 6)
        .map(publicMovieResult);
    response.json({ results });
});
app.get('/api/legal-movies', async (request, response) => {
    const rawQuery = String(request.query.q || '').trim().slice(0, 80);
    const query = normaliseSearch(rawQuery);
    const publicResults = FREE_FULL_MOVIES
        .filter((movie) => matchesMovie(movie, query))
        .slice(0, 6)
        .map(publicMovieResult);
    const [tmdbResults, openCatalogueResults] = await Promise.all([
        searchTmdbMovies(rawQuery),
        searchOpenFilmCatalogue(rawQuery)
    ]);
    const knownTitles = new Set(publicResults.map((movie) => normaliseSearch(movie.title)));
    const catalogueResults = [...tmdbResults, ...openCatalogueResults].filter((movie) => {
        const key = normaliseSearch(movie.title);
        if (knownTitles.has(key)) return false;
        knownTitles.add(key);
        return true;
    });
    response.json({
        results: [...publicResults, ...catalogueResults],
        catalogueEnabled: true,
        message: 'Searches the free open film catalogue. Full room playback is limited to public-domain or licensed video.'
    });
});
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
        // Everyone in a room is an audio listener by default. Existing speakers
        // are asked to create a WebRTC connection to the newcomer; no microphone
        // permission is needed to receive audio.
        for (const peerId of io.sockets.adapter.rooms.get(roomId) || []) {
            if (peerId === socket.id) continue;
            const peer = io.sockets.sockets.get(peerId);
            if (peer?.data.voiceActive) peer.emit('voice-peer-joined', socket.id);
        }
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

    // WebRTC signalling only. Audio itself travels peer-to-peer and is never stored on this server.
    // A participant may listen without enabling their microphone.
    socket.on('voice-join', () => {
        const roomId = socket.data.roomId;
        const members = io.sockets.adapter.rooms.get(roomId);
        if (!members) return;
        socket.data.voiceActive = true;
        for (const peerId of members) {
            if (peerId === socket.id) continue;
            // The speaker initiates connections to every listener. If a listener
            // later turns on their mic, this also renegotiates that same channel.
            socket.emit('voice-peer-joined', peerId);
        }
        socket.to(roomId).emit('voice-presence', { id: socket.id, active: true });
    });

    socket.on('voice-leave', () => {
        if (!socket.data.roomId) return;
        socket.data.voiceActive = false;
        socket.to(socket.data.roomId).emit('voice-peer-left', socket.id);
        socket.to(socket.data.roomId).emit('voice-presence', { id: socket.id, active: false });
        // Keep the former speaker as a listener: every remaining speaker opens a
        // fresh receive channel after the old bidirectional one is closed.
        for (const peerId of io.sockets.adapter.rooms.get(socket.data.roomId) || []) {
            const peer = io.sockets.sockets.get(peerId);
            if (peerId !== socket.id && peer?.data.voiceActive) peer.emit('voice-peer-joined', socket.id);
        }
    });

    socket.on('voice-signal', ({ target, signal } = {}) => {
        const roomId = socket.data.roomId;
        const recipient = io.sockets.sockets.get(target);
        if (!roomId || !recipient || recipient.data.roomId !== roomId) return;
        if (!signal || typeof signal !== 'object' || JSON.stringify(signal).length > 16000) return;
        recipient.emit('voice-signal', { from: socket.id, signal });
    });

    socket.on('disconnect', () => {
        const roomId = socket.data.roomId;
        const room = rooms.get(roomId);
        if (!room) return;
        room.users = room.users.filter((user) => user.id !== socket.id);
        if (socket.data.voiceActive) io.to(roomId).emit('voice-peer-left', socket.id);
        if (room.users.length === 0) rooms.delete(roomId);
        else {
            publishRoomState(roomId, room);
            io.to(roomId).emit('notice', `${socket.data.username || 'A guest'} left the room`);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Stream X Watch Together listening on port ${PORT}`));
