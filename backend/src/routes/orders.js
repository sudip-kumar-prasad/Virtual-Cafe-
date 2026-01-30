const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    const userId = req.user.userId;

    // Create order
    const [orderResult] = await db.execute(
      'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
      [userId, total, 'pending']
    );

    const orderId = orderResult.insertId;

    // Add order items
    for (const item of items) {
      await db.execute(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.quantity, item.price]
      );
    }

    res.status(201).json({ 
      message: 'Order created successfully',
      orderId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [orders] = await db.execute(`
      SELECT o.*, 
             GROUP_CONCAT(
               CONCAT(mi.name, ' (', oi.quantity, ')')
               SEPARATOR ', '
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [userId]);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;