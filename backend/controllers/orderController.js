const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { asyncHandler } = require('../middleware/errorHandler');
const { generateOrderNumber, validateOrderTotal } = require('../utils/orderUtils');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
    const { items, customerInfo, totalAmount, orderType, notes } = req.body;

    // REWARD CONFIGURATION
    const REWARD_MAP = {
        'reward-muffin-50': { name: '🎁 Free Muffin', cost: 50, image: '/assets/menu/muffin.png' },
        'reward-oasis-roast-100': { name: '🎁 Free Oasis Roast', cost: 100, image: '/assets/menu/oasis-roast.png' },
        'reward-latte-150': { name: '🎁 Free Sig. Latte', cost: 150, image: '/assets/menu/latte.png' },
        // Legacy support
        'reward-oasis-roast': { name: '🎁 Free Oasis Roast', cost: 100, image: '/assets/menu/oasis-roast.png' }
    };

    // Verify all menu items exist and are available
    // FILTER OUT REWARDS: We don't look them up in the DB
    const standardItems = items.filter(item => !REWARD_MAP[item.id]);
    const rewardItems = items.filter(item => REWARD_MAP[item.id]);

    const menuItemIds = standardItems.map(item => item.id);
    const menuItems = await MenuItem.find({
        _id: { $in: menuItemIds },
        isAvailable: true
    });

    if (menuItems.length !== standardItems.length) {
        const error = new Error('Some menu items are not available or do not exist');
        error.statusCode = 400;
        throw error;
    }

    // Calculate points used
    let pointsUsed = 0;

    // Build order items with current prices from database
    const orderItems = items.map(item => {
        // CASE A: It's a special reward item
        if (REWARD_MAP[item.id]) {
            const reward = REWARD_MAP[item.id];
            pointsUsed += (reward.cost * item.quantity);
            return {
                menuItem: item.id,
                name: reward.name,
                price: 0,
                quantity: item.quantity
            };
        }

        // CASE B: Standard menu item
        const menuItem = menuItems.find(mi => mi._id.toString() === item.id);
        return {
            menuItem: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: item.quantity
        };
    });

    // POINT BALANCE VALIDATION
    if (pointsUsed > 0) {
        // If user is guest, they can't use points (though frontend shouldn't allow this)
        if (!req.user) {
            const error = new Error('Guest users cannot use loyalty points');
            error.statusCode = 401;
            throw error;
        }

        // Fetch user's history to calculate balance
        const pastOrders = await Order.find({ user: req.user._id });

        const totalEarned = pastOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        const totalSpent = pastOrders.reduce((sum, o) => sum + (o.pointsUsed || 0), 0);
        const currentBalance = Math.floor(totalEarned) - totalSpent;

        if (currentBalance < pointsUsed) {
            const error = new Error(`Insufficient loyalty points. You have ${currentBalance} but this order requires ${pointsUsed}.`);
            error.statusCode = 400;
            throw error;
        }
    }

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
        pointsUsed, // Save the points spent
        customerInfo,
        orderType: orderType || 'takeaway',
        notes: notes || '',
        user: req.user ? req.user._id : null
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

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    // 1. req.user._id comes from the auth middleware (protect function)
    // 2. Find all orders where the 'user' field matches this ID
    // 3. .sort({ createdAt: -1 }) sorts the results to show newest orders first
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    // 4. Return the list of orders to the frontend
    res.json({
        success: true,
        data: orders
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
    getMyOrders,
    updateOrderStatus
};
