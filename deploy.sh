#!/bin/bash

# Quick deployment script for Stream X website
# Usage: ./deploy.sh "Your commit message"

if [ -z "$1" ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: ./deploy.sh \"Your commit message\""
    exit 1
fi

echo "📦 Adding changes to git..."
git add .

echo "💾 Committing changes..."
git commit -m "$1

Co-Authored-By: Warp <agent@warp.dev>"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Deployed! Your changes will be live at https://faresfadly1.github.io/stream-x-website/ in 1-2 minutes"
