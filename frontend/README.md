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

- React 18
- React Router DOM
- React Hook Form
- Lucide React Icons
- CSS3
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

## License

ISC