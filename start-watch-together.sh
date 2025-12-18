#!/bin/bash

# Stream X - Watch Together Quick Start Script

echo "🎬 Starting Stream X Watch Together Server..."
echo ""
echo "📝 Instructions:"
echo "1. Server will start on http://localhost:3000"
echo "2. Open http://localhost:3000/room.html in your browser"
echo "3. Click the share button to get the room link"
echo "4. Share the link with friends to watch together!"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "=========================================="
echo ""

cd "$(dirname "$0")"
npm start
