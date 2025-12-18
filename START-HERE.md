# 🚀 START HERE - Quick Guide

## How to Run Your Website Locally in VS Code

### Step 1: Open Live Server
1. **Right-click** on `movies.html` in the file explorer (left sidebar)
2. Select **"Open with Live Server"**
3. Your browser will open with the website running locally at `http://localhost:5500/movies.html`

✨ **Live Server will automatically refresh your browser whenever you save changes!**

---

## How to Deploy Changes to Your Live Website

After making changes and testing locally:

### Option A: Using VS Code Task (Easiest)
1. Press **`Cmd + Shift + P`**
2. Type **"Tasks: Run Task"**
3. Select **"🚀 Deploy to GitHub Pages"**
4. Enter your commit message
5. Wait 1-2 minutes, then refresh https://faresfadly1.github.io/stream-x-website/movies.html

### Option B: Using Terminal
Open terminal in VS Code (`` Ctrl + ` ``) and run:
```bash
./deploy.sh "your message here"
```

---

## Workflow Summary

```
1. Edit files in VS Code
   ↓
2. Save (Cmd + S) → Live Server auto-refreshes
   ↓
3. Test locally → looks good?
   ↓
4. Run deploy task → pushes to GitHub
   ↓
5. Wait 1-2 min → Live website updates!
```

---

## Keyboard Shortcuts

- **Save**: `Cmd + S`
- **Open Command Palette**: `Cmd + Shift + P`
- **Open Terminal**: `` Ctrl + ` ``
- **Search Files**: `Cmd + P`

---

## Files You'll Edit Most

- **`movies.html`** - Main page structure
- **`movies-data.js`** - Movie information (titles, trailers, cast)

---

**Need help?** Check `DEPLOY.md` for more detailed instructions!
