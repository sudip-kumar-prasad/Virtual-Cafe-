# Complete Deployment Checklist

## Prerequisites
- [ ] GitHub account
- [ ] Vercel account (vercel.com)
- [ ] Render account (render.com)
- [ ] PlanetScale account (planetscale.com) for database

## Step 1: Database Setup (PlanetScale)

### 1.1 Create Database
1. Go to [planetscale.com](https://planetscale.com)
2. Sign up/Login
3. Click "Create database"
4. Name: `virtual-cafe`
5. Region: Choose closest to you
6. Click "Create database"

### 1.2 Get Connection Details
1. Go to your database dashboard
2. Click "Connect"
3. Select "General" 
4. Copy the connection details:
   - Host
   - Username  
   - Password
   - Database name

### 1.3 Create Tables
1. Click "Console" in PlanetScale
2. Run this SQL:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

INSERT INTO menu_items (name, description, price, category, image) VALUES
('Espresso', 'Rich and bold espresso shot', 2.50, 'Coffee', '/images/espresso.jpg'),
('Cappuccino', 'Espresso with steamed milk and foam', 4.00, 'Coffee', '/images/cappuccino.jpg'),
('Latte', 'Espresso with steamed milk', 4.50, 'Coffee', '/images/latte.jpg'),
('Americano', 'Espresso with hot water', 3.00, 'Coffee', '/images/americano.jpg'),
('Croissant', 'Buttery, flaky pastry', 3.50, 'Pastry', '/images/croissant.jpg'),
('Blueberry Muffin', 'Fresh blueberry muffin', 3.00, 'Pastry', '/images/muffin.jpg'),
('Caesar Salad', 'Fresh romaine with caesar dressing', 8.50, 'Salad', '/images/caesar.jpg'),
('Club Sandwich', 'Triple-decker with turkey and bacon', 9.00, 'Sandwich', '/images/club.jpg');
```

## Step 2: Push to GitHub

### 2.1 Initialize Git (if not done)
```bash
cd /Users/sudipkumarprasad/Desktop/Virtual-Cafe-
git init
git add .
git commit -m "Initial commit"
```

### 2.2 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name: `virtual-cafe`
4. Make it public
5. Don't initialize with README
6. Click "Create repository"

### 2.3 Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/virtual-cafe.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend (Render)

### 3.1 Create Web Service
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your `virtual-cafe` repository
5. Configure:
   - **Name:** `virtual-cafe-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### 3.2 Add Environment Variables
In Render dashboard, add these:
```
NODE_ENV=production
PORT=10000
DB_HOST=your_planetscale_host
DB_USER=your_planetscale_username
DB_PASSWORD=your_planetscale_password
DB_NAME=virtual-cafe
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random
```

### 3.3 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL (e.g., `https://virtual-cafe-backend.onrender.com`)

## Step 4: Update Frontend Configuration

### 4.1 Update Production Environment
Edit `frontend/.env.production`:
```
REACT_APP_API_URL=https://YOUR_BACKEND_URL.onrender.com/api
```

### 4.2 Update CORS in Backend
Edit `backend/server.js` line 15:
```javascript
origin: process.env.NODE_ENV === 'production' 
  ? ['https://YOUR_FRONTEND_URL.vercel.app'] 
  : ['http://localhost:3000'],
```

### 4.3 Commit Changes
```bash
git add .
git commit -m "Update production configuration"
git push
```

## Step 5: Deploy Frontend (Vercel)

### 5.1 Create Project
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `virtual-cafe` repository
5. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### 5.2 Add Environment Variables
In Vercel dashboard:
```
REACT_APP_API_URL=https://YOUR_BACKEND_URL.onrender.com/api
```

### 5.3 Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Copy your frontend URL (e.g., `https://virtual-cafe.vercel.app`)

## Step 6: Final Configuration

### 6.1 Update Backend CORS
1. Go back to your backend code
2. Update `server.js` with your actual Vercel URL
3. Commit and push:
```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push
```

### 6.2 Redeploy Backend
Render will automatically redeploy when you push to GitHub.

## Step 7: Testing

### 7.1 Test Backend
Visit: `https://YOUR_BACKEND_URL.onrender.com/api/health`
Should return: `{"message":"Virtual Cafe API is running!"}`

### 7.2 Test Frontend
1. Visit your Vercel URL
2. Try signing up with a new account
3. Try signing in
4. Test all features

## Troubleshooting

### Common Issues:
1. **CORS Error:** Update backend CORS with correct frontend URL
2. **Database Connection:** Check PlanetScale credentials
3. **Build Failure:** Check logs in Render/Vercel dashboard
4. **API Not Found:** Verify backend URL in frontend env

### Environment Variables Checklist:

**Backend (Render):**
- [ ] NODE_ENV=production
- [ ] PORT=10000
- [ ] DB_HOST=your_planetscale_host
- [ ] DB_USER=your_planetscale_username
- [ ] DB_PASSWORD=your_planetscale_password
- [ ] DB_NAME=virtual-cafe
- [ ] JWT_SECRET=your_secret_key

**Frontend (Vercel):**
- [ ] REACT_APP_API_URL=https://your-backend.onrender.com/api

## Final URLs
After successful deployment:
- **Frontend:** https://virtual-cafe.vercel.app
- **Backend:** https://virtual-cafe-backend.onrender.com
- **API:** https://virtual-cafe-backend.onrender.com/api

## Security Notes
- Never commit `.env` files to GitHub
- Use strong JWT secrets
- Keep database credentials secure
- Enable HTTPS only in production