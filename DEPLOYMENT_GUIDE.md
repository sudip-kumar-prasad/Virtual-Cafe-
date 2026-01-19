# Deployment Guide

## Backend Deployment on Render

### Step 1: Prepare Backend
1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up/login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select the `backend` folder as root directory

### Step 2: Configure Render
- **Name:** virtual-cafe-backend
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

### Step 3: Set Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
PORT=10000
DB_HOST=your_mysql_host
DB_USER=your_mysql_user  
DB_PASSWORD=your_mysql_password
DB_NAME=Virtual_cafe
JWT_SECRET=your_secure_jwt_secret
```

### Step 4: Database Setup
You'll need a cloud MySQL database:
- **Option 1:** PlanetScale (free tier)
- **Option 2:** Railway MySQL
- **Option 3:** Aiven MySQL

## Frontend Deployment on Vercel

### Step 1: Update API URL
1. Copy your Render backend URL (e.g., `https://virtual-cafe-backend.onrender.com`)
2. Update `frontend/.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Set **Root Directory** to `frontend`
5. Click "Deploy"

### Step 3: Environment Variables (Vercel)
Add in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## Deployment Order
1. **Deploy Backend first** (Render)
2. **Get backend URL** from Render
3. **Update frontend .env.production** with backend URL
4. **Deploy Frontend** (Vercel)

## Post-Deployment
1. Test authentication (signup/signin)
2. Verify API connectivity
3. Check database connections
4. Test all features

## Troubleshooting
- **CORS errors:** Add frontend URL to backend CORS config
- **Database connection:** Verify MySQL credentials
- **API not found:** Check backend URL in frontend env
- **Build failures:** Check logs in respective platforms

## URLs After Deployment
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **API:** `https://your-backend.onrender.com/api`