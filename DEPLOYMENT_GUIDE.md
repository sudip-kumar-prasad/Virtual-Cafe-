# 🚀 Vercel Deployment - Step by Step Guide

## Summary of Changes Made

I've prepared your project for Vercel deployment with:
- ✅ Backend `vercel.json` configuration
- ✅ Updated root `vercel.json` 
- ✅ Environment variable templates
- ✅ Deployment guide document
- ✅ All pushed to GitHub

---

## 🎯 DEPLOYMENT STEPS

### Step 1: Deploy Backend to Vercel

#### 1.1 Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Sign in with GitHub if not already signed in

#### 1.2 Create New Project
- Click **"Add New..."** button
- Click **"Project"**
- Select your GitHub repo: **Virtual-Cafe-**

#### 1.3 Configure Project
- **Framework Preset**: Select **"Other"**
- **Root Directory**: Select **`backend/`** from dropdown
  
#### 1.4 Set Environment Variables
- Click **"Environment Variables"** section
- Add these variables (get values from your current `.env`):

```
DATABASE_URL = mysql://root:%40J3sci767@localhost:3306/virtual_cafe

JWT_SECRET = your-secret-key-change-this-in-production

NODE_ENV = production
```

⚠️ **IMPORTANT**: Your MySQL database must be accessible from Vercel servers!
- If using local MySQL, consider using a cloud database like:
  - PlanetScale (MySQL compatible)
  - AWS RDS
  - DigitalOcean Managed Database

#### 1.5 Deploy
- Click **"Deploy"** button
- Wait for deployment to complete (takes ~2-3 minutes)
- You'll get a URL like: `https://your-backend-name.vercel.app`
- **Copy this URL - you'll need it for frontend!**

#### 1.6 Verify Backend
Open your terminal and test:
```bash
curl https://your-backend-name.vercel.app/health
```

Should return: `{"status":"OK","message":"Server is running"}`

---

### Step 2: Deploy Frontend to Vercel

#### 2.1 Create New Project
- Go back to https://vercel.com/dashboard
- Click **"Add New..."** → **"Project"**
- Select your GitHub repo again: **Virtual-Cafe-**

#### 2.2 Configure Project
- **Framework Preset**: Select **"Create React App"**
- **Root Directory**: Select **`frontend/`** from dropdown
- **Build Command**: `npm run build` (should auto-fill)
- **Install Command**: `npm install` (should auto-fill)

#### 2.3 Set Environment Variables
- Click **"Environment Variables"** section
- Add this variable:

```
REACT_APP_API_URL = https://your-backend-name.vercel.app/api
```

Replace `your-backend-name` with your actual backend URL from Step 1.5

#### 2.4 Deploy
- Click **"Deploy"** button
- Wait for deployment to complete
- You'll get a URL like: `https://your-frontend-name.vercel.app`

#### 2.5 Verify Frontend
- Open https://your-frontend-name.vercel.app in browser
- Try signing up with a new email
- It should work! 🎉

---

## 📊 Deployment Checklist

- [ ] Backend deployed to Vercel
- [ ] Backend URL copied: `https://___________`
- [ ] Frontend environment variable updated with backend URL
- [ ] Frontend deployed to Vercel
- [ ] Backend health endpoint working
- [ ] Frontend loads in browser
- [ ] Can create a new user account
- [ ] Can sign in successfully

---

## 🔧 Important Configurations

### Backend (vercel.json)
Already configured in `/backend/vercel.json`:
- Uses `@vercel/node` runtime
- Runs `server.js` as entry point
- All routes directed to server.js
- NODE_ENV set to production

### Frontend (vercel.json)
Already configured in `/frontend/vercel.json`:
- Uses Create React App framework
- Builds to `build/` directory
- Auto-handles React Router

---

## 🚨 Troubleshooting

### Backend Deployment Issues

**Problem**: Deployment fails with "MODULE_NOT_FOUND"
- Solution: Check that `postinstall` script in backend package.json runs `prisma generate`
- This is already configured ✅

**Problem**: 502 Bad Gateway Error
- Check backend logs: https://vercel.com/dashboard → Your Backend Project → Logs
- Likely causes:
  - Database connection error (check DATABASE_URL)
  - Server crash (check logs)
  - Environment variables not set

**Problem**: Database Connection Error
- Verify DATABASE_URL is correct
- If using local MySQL:
  - Set up ngrok tunnel: `ngrok tcp 3306`
  - Update DATABASE_URL with ngrok URL
  - Or use cloud database (recommended)

### Frontend Issues

**Problem**: SignUp fails with "Cannot fetch from API"
- Check REACT_APP_API_URL in Vercel environment variables
- Must include `/api` at the end
- Clear browser cache (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)

**Problem**: Built files missing
- Check that `npm run build` is set as Build Command
- Check build logs for errors

---

## 📚 Environment Variables Reference

### Backend (.env)
```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=secure-random-string
PORT=          (auto, leave blank for Vercel)
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

---

## 🔐 Security Notes

- ✅ `.env` is in `.gitignore` - not committed
- ✅ Credentials stored only in Vercel environment variables
- ✅ Frontend has no sensitive data
- ⚠️ Change `JWT_SECRET` to a strong random string in production
- ⚠️ Use HTTPS only (Vercel auto-enables this)

---

## 📈 Next Steps (Optional)

After deployment is working:

1. **Set up custom domain:**
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain

2. **Enable automatic deployments:**
   - Already enabled! Pushing to `main` auto-deploys

3. **Set up staging environment:**
   - Create a branch like `staging`
   - Deploy to different Vercel project for testing

4. **Monitor performance:**
   - Use Vercel Analytics
   - Check logs regularly

---

## 🆘 Need Help?

**Vercel Docs**: https://vercel.com/docs
**Common Issues**: https://vercel.com/docs/troubleshooting
**GitHub Repo**: https://github.com/sudip-kumar-prasad/Virtual-Cafe-

---

## ✨ You're All Set!

Your project is now ready for Vercel deployment. The configuration files are:
- `/backend/vercel.json` - Backend configuration
- `/frontend/vercel.json` - Frontend configuration  
- `/VERCEL_DEPLOYMENT.md` - Full deployment guide
- `/deploy.sh` - Helper script

Good luck! 🚀
