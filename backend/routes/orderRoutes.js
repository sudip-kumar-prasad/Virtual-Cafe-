const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrderByNumber,
    updateOrderStatus
} = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validators');

router.post('/', validateOrder, createOrder);
router.get('/:orderNumber', getOrderByNumber);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
