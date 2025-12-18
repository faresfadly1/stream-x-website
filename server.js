const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files
app.use(express.static(__dirname));

// Store room data
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a room
    socket.on('join-room', (roomId, username) => {
        socket.join(roomId);
        
        // Initialize room if it doesn't exist
        if (!rooms.has(roomId)) {
            rooms.set(roomId, {
                users: [],
                currentVideo: null,
                videoState: {
                    playing: false,
                    currentTime: 0
                }
            });
        }

        const room = rooms.get(roomId);
        
        // Add user to room
        const user = {
            id: socket.id,
            username: username || 'Anonymous'
        };
        room.users.push(user);

        // Send current room state to the new user
        socket.emit('room-state', {
            users: room.users,
            currentVideo: room.currentVideo,
            videoState: room.videoState
        });

        // Notify others in the room
        socket.to(roomId).emit('user-joined', user);
        
        console.log(`User ${username} joined room ${roomId}`);
    });

    // Handle video change
    socket.on('change-video', (roomId, videoUrl) => {
        const room = rooms.get(roomId);
        if (room) {
            room.currentVideo = videoUrl;
            room.videoState = { playing: true, currentTime: 0 };
            
            // Broadcast to all users in the room including sender
            io.to(roomId).emit('video-changed', videoUrl);
            console.log(`Video changed in room ${roomId}: ${videoUrl}`);
        }
    });

    // Handle play/pause
    socket.on('video-play', (roomId) => {
        const room = rooms.get(roomId);
        if (room) {
            room.videoState.playing = true;
            socket.to(roomId).emit('video-play');
        }
    });

    socket.on('video-pause', (roomId) => {
        const room = rooms.get(roomId);
        if (room) {
            room.videoState.playing = false;
            socket.to(roomId).emit('video-pause');
        }
    });

    // Handle video seek
    socket.on('video-seek', (roomId, time) => {
        const room = rooms.get(roomId);
        if (room) {
            room.videoState.currentTime = time;
            socket.to(roomId).emit('video-seek', time);
        }
    });

    // Handle chat messages
    socket.on('chat-message', (roomId, message, username) => {
        io.to(roomId).emit('chat-message', {
            username: username || 'Anonymous',
            message: message,
            timestamp: new Date().toISOString()
        });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        // Remove user from all rooms
        rooms.forEach((room, roomId) => {
            const userIndex = room.users.findIndex(u => u.id === socket.id);
            if (userIndex !== -1) {
                const user = room.users[userIndex];
                room.users.splice(userIndex, 1);
                
                // Notify others
                io.to(roomId).emit('user-left', user);
                
                // Clean up empty rooms
                if (room.users.length === 0) {
                    rooms.delete(roomId);
                    console.log(`Room ${roomId} deleted (empty)`);
                }
            }
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
