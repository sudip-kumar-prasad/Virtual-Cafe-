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
- React 18
- React Router DOM
- React Hook Form
- Lucide React Icons
- CSS3

### Backend
- Express.js 4
- MySQL 8
- JWT Authentication
- bcryptjs (Password hashing)
- CORS

## Features

- User authentication (register/login)
- Menu browsing with database
- Shopping cart functionality
- Order management
- User profile management
- Responsive UI
- RESTful API

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/menu` - Get menu items
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/health` - Health check

## Database Schema

- **users** - User accounts
- **menu_items** - Cafe menu items
- **orders** - Customer orders
- **order_items** - Order line items

## Development

1. **Start MySQL server**
2. **Run database setup:**
   ```bash
   npm run setup-db
   ```
3. **Start development servers:**
   ```bash
   npm run dev
   ```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## License

ISC