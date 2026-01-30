const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { asyncHandler } = require('../middleware/errorHandler');
const { generateOrderNumber, validateOrderTotal } = require('../utils/orderUtils');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
    const { items, customerInfo, totalAmount, orderType, notes } = req.body;

    // Verify all menu items exist and are available
    const menuItemIds = items.map(item => item.id);
    const menuItems = await MenuItem.find({
        _id: { $in: menuItemIds },
        isAvailable: true
    });

    if (menuItems.length !== items.length) {
        const error = new Error('Some menu items are not available or do not exist');
        error.statusCode = 400;
        throw error;
    }

    // Build order items with current prices from database
    const orderItems = items.map(item => {
        const menuItem = menuItems.find(mi => mi._id.toString() === item.id);
        return {
            menuItem: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: item.quantity
        };
    });

    // Validate total amount
    if (!validateOrderTotal(orderItems, totalAmount)) {
        const error = new Error('Order total does not match item prices');
        error.statusCode = 400;
        throw error;
    }

    // Create order
    const order = await Order.create({
        orderNumber: generateOrderNumber(),
        items: orderItems,
        totalAmount,
        customerInfo,
        orderType: orderType || 'takeaway',
        notes: notes || ''
    });

    res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
    });
});

// @desc    Get order by order number
// @route   GET /api/orders/:orderNumber
// @access  Public
const getOrderByNumber = asyncHandler(async (req, res) => {
    const order = await Order.findOne({
        orderNumber: req.params.orderNumber
    }).populate('items.menuItem', 'name category image');

    if (!order) {
        const error = new Error('Order not found');
        error.statusCode = 404;
        throw error;
    }

    res.json({
        success: true,
        data: order
    });
});

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private (Admin) - currently public for testing
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
        const error = new Error('Invalid status');
        error.statusCode = 400;
        throw error;
    }

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    );

    if (!order) {
        const error = new Error('Order not found');
        error.statusCode = 404;
        throw error;
    }

    res.json({
        success: true,
        message: 'Order status updated',
        data: order
    });
});

module.exports = {
    createOrder,
    getOrderByNumber,
    updateOrderStatus
};
