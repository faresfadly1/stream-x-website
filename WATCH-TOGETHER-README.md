# Stream X - Watch Together Feature

## 🚀 Real-Time Video Synchronization

Your watch together feature is now fully functional with real-time synchronization! When you and your friends join the same room, you'll all see the same video at the same time.

## 📋 Setup Instructions

### 1. Install Dependencies

First, you need to install Node.js packages:

```bash
cd /Users/faresfadly/Desktop/stream-x-website
npm install
```

### 2. Start the Server

Run the backend server:

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 3. Open the Watch Together Page

Open your browser and go to:
```
http://localhost:3000/room.html
```

## 🎯 How It Works

### Creating a Room
1. When you first open `room.html`, a unique room ID is automatically generated
2. The room ID is added to the URL (e.g., `http://localhost:3000/room.html?room=abc123xyz`)

### Sharing with Friends
1. Click the **share button** (user-plus icon) in the top right
2. The URL will be copied to your clipboard
3. Share this URL with your friends
4. When they open the link, they'll join YOUR room

### What's Synchronized
- ✅ Video selection (when anyone picks a video, everyone sees it)
- ✅ User list (see who's in the room)
- ✅ Chat messages (communicate in real-time)
- ✅ Join/leave notifications

## 🎬 Using the Watch Together Feature

1. **Select a Video**: 
   - Click the input field or choose from suggestions
   - Paste any YouTube URL
   - Press Enter or click a suggestion

2. **Everyone Sees the Same Video**:
   - When you select a video, it automatically loads for everyone in the room
   - All users watch the same content simultaneously

3. **Chat**:
   - Use the chat box at the bottom to communicate
   - Press Enter to send messages
   - Everyone in the room sees the messages instantly

4. **See Who's Watching**:
   - Click the "People" tab to see all users in the room
   - The count updates automatically as people join/leave

## 🔧 Technical Details

### Files Created
- `server.js` - Backend server with Socket.IO
- `package.json` - Node.js dependencies
- `room.html` - Updated with real-time features

### How Real-Time Works
- Uses **Socket.IO** for WebSocket connections
- Server maintains room state
- All actions are broadcast to room members
- Automatic reconnection if connection drops

## 🌐 Deploying to Production

To use this online (not just localhost), you'll need to:

1. Deploy the Node.js server to a hosting service like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean

2. Update the Socket.IO connection in `room.html` line 864:
   ```javascript
   const socket = io('http://localhost:3000');
   ```
   Change to your deployed server URL:
   ```javascript
   const socket = io('https://your-server-url.com');
   ```

3. Deploy your static files (HTML/CSS/JS) to GitHub Pages and ensure they connect to your backend server

## 🎨 Customization

### Change Room Name
Update line 741 in `room.html`:
```html
<span class="room-name">Malicious Girls</span>
```

### Change Username Generation
Edit line 865 in `room.html`:
```javascript
const username = 'User' + Math.floor(Math.random() * 1000);
```

You can prompt users for their name instead.

## 🐛 Troubleshooting

**Issue**: Can't connect to server
- **Solution**: Make sure the server is running (`npm start`)

**Issue**: Video doesn't sync
- **Solution**: Check browser console for errors. Ensure both users are in the same room (same URL)

**Issue**: "Can't find module" error
- **Solution**: Run `npm install` again

## 📝 Features

✅ Automatic room creation  
✅ Shareable room links  
✅ Real-time video synchronization  
✅ Live chat  
✅ User presence (see who's online)  
✅ YouTube video support  
✅ Clean, modern UI  

Enjoy watching together! 🍿
