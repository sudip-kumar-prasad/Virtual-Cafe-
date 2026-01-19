# GitHub Repository Setup

## Step 1: Create GitHub Repository
1. Go to https://github.com
2. Click "New repository" (green button)
3. Repository name: `virtual-cafe`
4. Description: `Full-stack Virtual Cafe application with React frontend and Express/MySQL backend`
5. Make it **Public**
6. **DO NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

## Step 2: Push Your Code
After creating the repository, run these commands in your terminal:

```bash
cd /Users/sudipkumarprasad/Desktop/Virtual-Cafe-
git remote add origin https://github.com/YOUR_USERNAME/virtual-cafe.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Verify Upload
1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Check that both `frontend/` and `backend/` folders are there

## Next Steps
Once pushed to GitHub, you can proceed with deployment:
1. Deploy backend on Render
2. Deploy frontend on Vercel
3. Follow the COMPLETE_DEPLOYMENT_GUIDE.md

Your repository will be at: https://github.com/YOUR_USERNAME/virtual-cafe