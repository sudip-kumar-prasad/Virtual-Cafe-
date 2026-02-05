const MenuItem = require('../models/MenuItem');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getAllMenuItems = asyncHandler(async (req, res) => {
    const { category, available } = req.query;

    let filter = {};

    if (category && category !== 'all') {
        filter.category = category;
    }

    if (available !== undefined) {
        filter.isAvailable = available === 'true';
    }

    const menuItems = await MenuItem.find(filter).sort({ category: 1, name: 1 });

    res.json({
        success: true,
        count: menuItems.length,
        data: menuItems
    });
});

// @desc    Get menu item by ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = asyncHandler(async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
        const error = new Error('Menu item not found');
        error.statusCode = 404;
        throw error;
    }

    res.json({
        success: true,
        data: menuItem
    });
});

// @desc    Get menu items by category
// @route   GET /api/menu/category/:category
// @access  Public
const getMenuItemsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    const filter = { category };

    // Only show available items by default
    if (req.query.available !== 'false') {
        filter.isAvailable = true;
    }

    const menuItems = await MenuItem.find(filter).sort({ name: 1 });

    res.json({
        success: true,
        count: menuItems.length,
        category: category,
        data: menuItems
    });
});

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    getMenuItemsByCategory
};
