#!/bin/bash

# Virtual Cafe Vercel Deployment Helper Script
# This script helps you prepare for Vercel deployment

echo "🚀 Virtual Cafe - Vercel Deployment Helper"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not found!"
    echo "Please initialize git first: git init"
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Check if files are committed
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ All changes committed"
else
    echo "⚠️  You have uncommitted changes:"
    git status --short
    echo ""
    echo "Please commit your changes first:"
    echo "  git add ."
    echo "  git commit -m 'Your message'"
    exit 1
fi

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo ""
echo "Backend Setup:"
echo "  1. Update DATABASE_URL in Vercel environment variables"
echo "     - Format: mysql://user:password@host:port/database"
echo "  2. Update JWT_SECRET with a strong random string"
echo "  3. Deploy backend first!"
echo ""
echo "Frontend Setup:"
echo "  1. Update REACT_APP_API_URL with your backend URL"
echo "  2. Deploy frontend after backend"
echo ""
echo "📚 For detailed instructions, see VERCEL_DEPLOYMENT.md"
echo ""
echo "🎯 Quick Start:"
echo "  1. Go to https://vercel.com/dashboard"
echo "  2. Click 'Add New Project'"
echo "  3. Select your GitHub repository"
echo "  4. Set Root Directory to 'backend/' or 'frontend/'"
echo "  5. Add environment variables"
echo "  6. Click Deploy!"
echo ""
