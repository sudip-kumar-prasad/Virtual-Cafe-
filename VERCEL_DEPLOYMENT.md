# Vercel Deployment Guide - Virtual Cafe

## Overview
This guide covers deploying both the backend and frontend separately to Vercel.

## Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub account with your repo pushed
- Environment variables prepared

---

## STEP 1: Prepare Your Repository

### Make sure everything is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

---

## STEP 2: Deploy Backend to Vercel

### Option A: Deploy as Separate Project (Recommended)

1. **Create a new Vercel project:**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repo
   - Select "Other" as framework
   - Configure project settings:
     - **Root Directory**: `backend/`
     - **Build Command**: `npm install && npx prisma generate`
     - **Output Directory**: (leave empty)
     - **Install Command**: `npm install`

2. **Set Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add these variables:
     ```
     DATABASE_URL: mysql://[user]:[password]@[host]:[port]/[database]
     JWT_SECRET: your-secret-key-here
     NODE_ENV: production
     PORT: (auto)
     ```
   - ⚠️ Make sure your MySQL database is accessible from the internet

3. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-backend-name.vercel.app`

---

## STEP 3: Deploy Frontend to Vercel

### Deploy Frontend Project

1. **Create a new Vercel project for frontend:**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repo
   - Select "Create React App" as framework
   - Configure project settings:
     - **Root Directory**: `frontend/`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

2. **Set Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL: https://your-backend-name.vercel.app/api
     ```
   - Replace `your-backend-name` with your actual backend URL from Step 2

3. **Deploy:**
   - Click "Deploy"
   - Your frontend will be available at: `https://your-frontend-name.vercel.app`

---

## STEP 4: Update Frontend Environment Variables

After backend deployment, update your code:

### frontend/.env.production
```env
REACT_APP_API_URL=https://your-backend-name.vercel.app/api
```

Or add it directly in Vercel dashboard environment variables.

---

## STEP 5: Verify Deployment

1. **Test Backend:**
   ```bash
   curl https://your-backend-name.vercel.app/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Signup Endpoint:**
   ```bash
   curl -X POST https://your-backend-name.vercel.app/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test","password":"pass123"}'
   ```

3. **Visit Frontend:**
   - Open https://your-frontend-name.vercel.app
   - Test sign up functionality

---

## Important Notes

⚠️ **Database Connectivity:**
- Your MySQL database must be accessible from Vercel servers
- Add Vercel IP ranges to your database firewall if needed
- Better option: Use a managed database service (PlanetScale, Aiven, etc.)

⚠️ **CORS Issues:**
- Your backend already has CORS enabled
- Make sure frontend URL is allowed (currently allows all origins)

⚠️ **Environment Variables:**
- Never commit .env files with real credentials
- Always use Vercel dashboard for sensitive data

---

## Quick Links
- Backend Dashboard: https://vercel.com/dashboard
- Frontend Dashboard: https://vercel.com/dashboard
- Vercel Documentation: https://vercel.com/docs

---

## Troubleshooting

### Deployment fails with "MODULE_NOT_FOUND"
- Make sure `package.json` has all dependencies
- Check `postinstall` script runs prisma generate

### 502 Bad Gateway Error
- Check backend logs in Vercel dashboard
- Verify environment variables are set correctly
- Check database connection

### CORS Error in Frontend
- Update `REACT_APP_API_URL` to backend URL
- Clear browser cache and rebuild frontend

### Database Connection Error
- Verify DATABASE_URL is correct
- Check if database is accessible from internet
- Whitelist Vercel IPs in database firewall
