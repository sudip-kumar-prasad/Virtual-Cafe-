const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth-temp');
const menuRoutes = require('./src/routes/menu');
const orderRoutes = require('./src/routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://virtual-cafe-z3nd-7o1p578yi-sudip-kumars-projects-8f5cb1b4.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Virtual Cafe API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});