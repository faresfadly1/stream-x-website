# 🚀 How to Deploy Changes to Your Live Website

Your website is hosted at: **https://faresfadly1.github.io/stream-x-website/movies.html**

## Method 1: Using VS Code Tasks (Easiest)

1. Make your changes to any file in VS Code
2. Press `Cmd + Shift + P` (Mac) to open Command Palette
3. Type "Tasks: Run Task" and press Enter
4. Select "🚀 Deploy to GitHub Pages"
5. Enter a commit message (e.g., "Updated movie section")
6. Wait 1-2 minutes for GitHub Pages to rebuild
7. Refresh your live website!

## Method 2: Using the Deploy Script

1. Make your changes in VS Code
2. Open Terminal in VS Code (`` Ctrl + ` ``)
3. Run: `./deploy.sh "Your commit message here"`
4. Wait 1-2 minutes and refresh your website

## Method 3: Using Git Commands Manually

1. Make your changes in VS Code
2. Open Terminal in VS Code
3. Run these commands:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
4. Wait 1-2 minutes and refresh your website

## Quick Tips

- **Live Preview**: Press `Cmd + Shift + P` → "Tasks: Run Task" → "👀 Open Live Site" to open your website
- **Check Status**: Run `git status` to see what files you've changed
- **Undo Changes**: Run `git restore filename` to undo changes to a specific file
- **View History**: Run `git log --oneline` to see your commit history

## Files You Can Edit

- `movies.html` - Main movies page
- `movies-data.js` - Movie database (titles, trailers, cast, etc.)
- Any other HTML, CSS, or JS files in the project

Happy coding! 🎬
