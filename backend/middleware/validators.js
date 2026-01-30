const { body, param, validationResult } = require('express-validator');

// Validation result checker
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Order validation rules
const validateOrder = [
    body('items')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one item'),
    body('items.*.id')
        .notEmpty()
        .withMessage('Item ID is required'),
    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    body('totalAmount')
        .isFloat({ min: 0 })
        .withMessage('Total amount must be a positive number'),
    body('customerInfo.name')
        .trim()
        .notEmpty()
        .withMessage('Customer name is required'),
    body('customerInfo.email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('customerInfo.phone')
        .optional()
        .trim()
        .matches(/^[0-9+\s()-]+$/)
        .withMessage('Invalid phone number format'),
    body('orderType')
        .optional()
        .isIn(['dine-in', 'takeaway', 'delivery'])
        .withMessage('Invalid order type'),
    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Notes cannot exceed 500 characters'),
    validate
];

// Contact form validation rules
const validateContact = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('subject')
        .trim()
        .notEmpty()
        .withMessage('Subject is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Subject must be between 3 and 200 characters'),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters'),
    validate
];

// Category param validation
const validateCategory = [
    param('category')
        .isIn(['coffee', 'tea', 'pastry', 'food', 'all'])
        .withMessage('Invalid category'),
    validate
];

module.exports = {
    validateOrder,
    validateContact,
    validateCategory
};
