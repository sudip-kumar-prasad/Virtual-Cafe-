<<<<<<< HEAD
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
=======
# Virtual Cafe - Frontend

A modern React-based cafe management frontend application with local storage for data persistence.

## Features

- User authentication (localStorage-based)
- Menu browsing
- Shopping cart functionality
- User profile management
- Responsive UI
- No backend required

## Tech Stack

>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
- React 18
- React Router DOM
- React Hook Form
- Lucide React Icons
- CSS3
<<<<<<< HEAD

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
=======
- Local Storage for data persistence

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── CartItem.js     # Shopping cart item
│   ├── Footer.js       # Footer component
│   ├── MenuItem.jsx    # Menu item display
│   └── Navbar.js       # Navigation bar
├── context/            # React context providers
│   ├── AuthContext.js  # Authentication state
│   └── CartContext.js  # Shopping cart state
├── data/               # Static data
│   └── menuData.js     # Menu items data
├── hooks/              # Custom React hooks
│   └── useAuth.js      # Authentication hook
├── pages/              # Page components
│   ├── AboutPage.js    # About page
│   ├── CartPage.js     # Shopping cart page
│   ├── ContactPage.jsx # Contact page
│   ├── HomePage.js     # Home page
│   ├── MenuPage.js     # Menu page
│   ├── SigninPage.js   # Sign in page
│   └── SignupPage.js   # Sign up page
├── App.jsx             # Main app component
├── index.css           # Global styles
└── index.js            # App entry point
```

## Authentication

The app uses localStorage for user authentication simulation:
- Sign up creates a user record in localStorage
- Sign in checks localStorage for existing user
- User data persists across browser sessions
- No server or database required

## Data Storage

All data is stored locally in the browser:
- User authentication data
- Shopping cart contents
- Menu data (static)

## Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

## Deployment

The app can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50

## License

ISC