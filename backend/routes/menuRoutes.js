const express = require('express');
const router = express.Router();
const {
    getAllMenuItems,
    getMenuItemById,
    getMenuItemsByCategory
} = require('../controllers/menuController');
const { validateCategory } = require('../middleware/validators');

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);
router.get('/category/:category', validateCategory, getMenuItemsByCategory);

module.exports = router;
