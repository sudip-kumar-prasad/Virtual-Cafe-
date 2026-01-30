<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Route imports
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001;


// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Standard Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);


// Health Check
app.get('/', (req, res) => {
    res.json({ status: 'API is running...' });
});

// Error Handling Middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const menuRoutes = require('./src/routes/menu');
const orderRoutes = require('./src/routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://virtual-cafe-z3nd-7o1p578yi-sudip-kumars-projects-8f5cb1b4.vercel.app',
        'https://virtual-cafe-v7rt-q4n0ah8xe-sudip-kumars-projects-8f5cb1b4.vercel.app'
      ] 
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
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
