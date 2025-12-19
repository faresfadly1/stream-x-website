# 🚀 Deploy Watch Together Backend

## Quick Deploy to Render (Free)

### Step 1: Sign Up for Render
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (easiest option)

### Step 2: Create New Web Service
1. Click the **"New +"** button (top right)
2. Select **"Web Service"**

### Step 3: Connect Your Repository
1. Click **"Connect account"** if needed
2. Find and select: **faresfadly1/stream-x-website**
3. Click **"Connect"**

### Step 4: Configure the Service
Fill in these settings:

- **Name**: `stream-x-backend` (or any name you like)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### Step 5: Deploy
1. Click **"Create Web Service"** at the bottom
2. Wait 2-3 minutes for deployment
3. You'll see "Live" with a green indicator when ready
4. Copy your service URL (e.g., `https://stream-x-backend.onrender.com`)

### Step 6: Verify It's Working
Open your service URL in a browser. You should see a blank page (that's normal - it's a WebSocket server, not a website).

Check the logs in Render dashboard - you should see:
```
Server running on http://localhost:3000
```

## ✅ Already Done!

Your `room.html` is already configured to automatically use the Render server when online. No additional changes needed!

The code auto-detects:
- **localhost** → connects to `http://localhost:3000`
- **GitHub Pages** → connects to `https://stream-x-backend.onrender.com`

## 🧪 Test It

After deployment:

1. Open: https://faresfadly1.github.io/stream-x-website/room.html
2. Open browser console (F12) - you should see "Connected to server"
3. Click share button and open link in another tab
4. Select a video - both tabs should show it!

## 🐛 Troubleshooting

**Issue**: "Connection failed" in console
- **Solution**: Make sure your Render service shows "Live" (green)
- Check Render logs for errors

**Issue**: "Service unavailable" 
- **Solution**: Free Render services sleep after 15 min of inactivity. First visit takes 30 seconds to wake up. Refresh the page.

**Issue**: CORS errors
- **Solution**: Server is already configured for your GitHub Pages domain. Check if it's deployed correctly.

## 💡 Important Notes

### Free Tier Limitations
- Service sleeps after 15 minutes of no activity
- First connection after sleep takes 30 seconds to wake up
- 750 hours/month free (enough for demos and moderate use)

### Keep It Awake (Optional)
To prevent sleeping, use a service like UptimeRobot (free) to ping your server every 5 minutes:
1. Sign up at https://uptimerobot.com
2. Add monitor with your Render URL
3. Set check interval to 5 minutes

## 🎯 Next Steps

Once deployed, your watch together feature will work completely online! Anyone can:
1. Visit your GitHub Pages site
2. Get a room link
3. Share with friends
4. Watch videos together in real-time

No localhost needed! 🎉
