const jwt = require('jsonwebtoken');
// Helper function to generate a JWT (JSON Web Token)
// This token acts like a temporary "ID card" that proves who the user is
const generateToken = (id) => {
    // We use a secret key to sign the token (like a digital signature)
    const secret = process.env.JWT_SECRET || 'dev_secret_key_123';
    return jwt.sign({ id }, secret, {
        expiresIn: '30d', // Token serves as a valid session for 30 days
    });
};
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // 1. Get user input from the request body
    const { name, email, password } = req.body;

    // 2. Validation: Check if all fields are present
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // 3. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // 4. Create the user
    // Note: Password hashing is handled automatically in the User model (User.js)
    // using a 'pre-save' hook. We don't need to hash it here manually.
    const user = await User.create({
        name,
        email,
        password
    });

    // 5. Send back response if creation was successful
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // Send the token right away so they are logged in
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// (generateToken function is defined at the top of this file)

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
