// --- 1. Import necessary libraries ---
const express = require('express'); // The web framework
const dotenv = require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose'); // Interface to MongoDB
const cors = require('cors'); // Allow requests from our Frontend
const { errorHandler, notFound } = require('./middleware/errorHandler'); // Custom error handling

// Route imports
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

// --- 2. Initialize the application ---
// Check if we provided a port in .env, otherwise use 5001
const port = process.env.PORT || 5001;

// Connect to the Database
// (Note: MongoDB connection string must be valid in .env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


// Create the Express app instance
const app = express();

// --- 3. Middleware Setup ---
// These run before our route handlers

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [
      'https://virtual-cafe-amber.vercel.app',
      'https://virtual-cafe-z3nd-7o1p578yi-sudip-kumars-projects-8f5cb1b4.vercel.app',
      'https://virtual-cafe-v7rt-q4n0ah8xe-sudip-kumars-projects-8f5cb1b4.vercel.app'
    ]
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
};

// Standard Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'Virtual Cafe API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Virtual Cafe API is running!' });
});

// Error Handling Middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
