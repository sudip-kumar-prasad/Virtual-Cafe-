const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const [items] = await db.execute('SELECT * FROM menu_items WHERE available = 1');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const [items] = await db.execute(
      'SELECT * FROM menu_items WHERE id = ? AND available = 1',
      [req.params.id]
    );

    if (items.length === 0) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(items[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add menu item (admin only - simplified for now)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const [result] = await db.execute(
      'INSERT INTO menu_items (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category, image]
    );

    res.status(201).json({ 
      message: 'Menu item created successfully',
      itemId: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;