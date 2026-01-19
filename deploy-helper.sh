#!/bin/bash

echo "🚀 Virtual Cafe Deployment Helper"
echo "================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Virtual Cafe full-stack app"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. 🗄️  Set up PlanetScale Database:"
echo "   - Go to planetscale.com"
echo "   - Create database: 'virtual-cafe'"
echo "   - Run the SQL from COMPLETE_DEPLOYMENT_GUIDE.md"
echo ""
echo "2. 📤 Push to GitHub:"
echo "   - Create repository on github.com"
echo "   - Run: git remote add origin https://github.com/YOUR_USERNAME/virtual-cafe.git"
echo "   - Run: git push -u origin main"
echo ""
echo "3. 🖥️  Deploy Backend (Render):"
echo "   - Go to render.com"
echo "   - Create Web Service from GitHub repo"
echo "   - Root Directory: backend"
echo "   - Add environment variables from guide"
echo ""
echo "4. 🌐 Deploy Frontend (Vercel):"
echo "   - Go to vercel.com"
echo "   - Import GitHub repo"
echo "   - Root Directory: frontend"
echo "   - Add REACT_APP_API_URL environment variable"
echo ""
echo "📚 For detailed instructions, see: COMPLETE_DEPLOYMENT_GUIDE.md"
echo ""
echo "🎯 Your app will be live at:"
echo "   Frontend: https://virtual-cafe.vercel.app"
echo "   Backend:  https://virtual-cafe-backend.onrender.com"
echo ""