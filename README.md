# Virtual Cafe - Full Stack Application

A modern full-stack cafe management application with React frontend and Express.js/MySQL backend.

## Project Structure

```
Virtual-Cafe-/
├── frontend/              # React frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/              # Express.js + MySQL backend
│   ├── src/
│   ├── database.sql
│   ├── package.json
│   └── README.md
├── package.json          # Root workspace scripts
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install-all
```

2. Set up database:
```bash
# Create database and tables
npm run setup-db
```

3. Configure environment variables:

**Backend (.env)**
```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
```

**Frontend (.env)**
```bash
cd frontend
# .env already created with API URL
```

### Running the Application

**Development Mode** (runs both frontend and backend):
```bash
npm run dev
```

**Frontend Only:**
```bash
npm run start:frontend
```

**Backend Only:**
```bash
npm run start:backend
```

## Tech Stack

### Frontend
- React 18, React Router DOM, React Hook Form, Lucide React Icons

### Backend
- Express.js 4, MySQL 8, JWT Authentication, bcryptjs, CORS

## Database Setup

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  available BOOLEAN DEFAULT TRUE
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
```

## Deployment Guide

### Backend (Render/Node)
1. **Root Directory:** `backend`
2. **Environment Variables:** `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`

### Frontend (Vercel/React)
1. **Root Directory:** `frontend`
2. **Environment Variable:** `REACT_APP_API_URL=https://your-backend.com/api`
3. **Build Command:** `npm run build`
4. **Output Directory:** `build`

## License

ISC