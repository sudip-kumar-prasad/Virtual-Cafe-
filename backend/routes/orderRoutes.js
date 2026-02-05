const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrderByNumber,
    getMyOrders,
    updateOrderStatus
} = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validators');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, validateOrder, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:orderNumber', getOrderByNumber);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
