const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** THE AUTH ROUTER
 * This file handles everything related to Users: Joining (Register) and Signing In (Login).
 */
const router = express.Router();

/** 1. TEMPORARY MEMORY
 * Since we are in development, we use this array to store users.
 * Note: If you restart the server, the users will be wiped! In a real app, we use a Database.
 */
let registeredUsersList = [];

/** 2. REGISTRATION ROUTE (Sign Up)
 * URL: POST /api/auth/register
 */
router.post('/register', async (request, response) => {
  try {
    // A. Receive data from the frontend
    const { name, email, password } = request.body;

    // B. Validation: Make sure they filled everything out
    if (!name || !email || !password) {
      return response.status(400).json({
        message: 'Please provide all fields: name, email, and password.'
      });
    }

    // C. Check if the email is already taken
    const alreadyExists = registeredUsersList.find(u => u.email === email);
    if (alreadyExists) {
      return response.status(400).json({
        message: 'A user with this email already exists. Try logging in instead!'
      });
    }

    // D. SECURE PASSWORDS: Never store raw passwords! 
    // We "hash" them so they look like 's$2a$10$X...'
    const encryptedPassword = await bcrypt.hash(password, 10);

    // E. Create the New User object
    const newUserRecord = {
      id: registeredUsersList.length + 1,
      name: name,
      email: email,
      password: encryptedPassword,
      created_at: new Date()
    };

    // F. Save to our in-memory list
    registeredUsersList.push(newUserRecord);

    // G. Send back a success message
    response.status(201).json({
      message: 'Welcome to Café Oasis! Your account has been created.',
      userId: newUserRecord.id
    });

  } catch (err) {
    console.error('Error during registration:', err);
    response.status(500).json({ message: 'Server had trouble creating your account.' });
  }
});

/** 3. LOGIN ROUTE (Sign In)
 * URL: POST /api/auth/login
 */
router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    // A. Find the user by their email
    const userFound = registeredUsersList.find(u => u.email === email);
    if (!userFound) {
      return response.status(401).json({
        message: 'Invalid email or password. Please check your spelling.'
      });
    }

    // B. Compare the typed password with the encrypted one in our list
    const passwordIsCorrect = await bcrypt.compare(password, userFound.password);
    if (!passwordIsCorrect) {
      return response.status(401).json({
        message: 'Invalid email or password. Please check your spelling.'
      });
    }

    // C. SECURE TOKENS: Generate a "Badge" (JWT) that the user carries.
    // This lets the server know who is logged in for 24 hours.
    const securityToken = jwt.sign(
      { userId: userFound.id, email: userFound.email },
      process.env.JWT_SECRET || 'secret_key_for_students',
      { expiresIn: '24h' }
    );

    // D. Success! Send the badge and user info back to the frontend.
    response.json({
      message: 'Login successful! Welcome back.',
      token: securityToken,
      user: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email
      }
    });

  } catch (err) {
    console.error('Error during login:', err);
    response.status(500).json({ message: 'Server had trouble logging you in.' });
  }
});

module.exports = router;