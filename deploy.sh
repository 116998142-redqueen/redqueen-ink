#!/bin/bash
# Redqueen.ink — Deploy to GitHub + Vercel
# Usage: bash deploy.sh

set -e

echo "🚀 Redqueen.ink Deployment Script"
echo "================================="

# 1. GitHub
if [ -z "$GITHUB_TOKEN" ]; then
  echo ""
  echo "⚠️  GITHUB_TOKEN not set."
  echo ""
  echo "To deploy manually:"
  echo "  1. Go to https://github.com/new"
  echo "  2. Create a repo called 'redqueen-ink'"
  echo "  3. Run:"
  echo "     git remote add origin https://github.com/YOUR_USERNAME/redqueen-ink.git"
  echo "     git branch -M main"
  echo "     git push -u origin main"
  echo ""
  echo "  4. Go to https://vercel.com/import"
  echo "     Connect your GitHub repo → Set env vars from .env.example → Deploy"
  exit 1
fi

# Create GitHub repo
echo "📦 Creating GitHub repository..."
curl -s -X POST -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"redqueen-ink","description":"Write once, publish everywhere — AI content for blog, LinkedIn & newsletter","private":false}' \
  https://api.github.com/user/repos

# Push code
echo "📤 Pushing to GitHub..."
git remote add origin "https://$GITHUB_TOKEN@github.com/$(echo $GITHUB_TOKEN | cut -d/ -f3)/redqueen-ink.git" 2>/dev/null || true
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "Next step: Deploy on Vercel"
echo "  1. Go to https://vercel.com/import"
echo "  2. Import 'redqueen-ink' repo"
echo "  3. Add env vars from .env.example"
echo "  4. Deploy!"
