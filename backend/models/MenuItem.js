const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Menu item name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['coffee', 'tea', 'pastry', 'food'],
            message: '{VALUE} is not a valid category'
        }
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    isVegetarian: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
menuItemSchema.index({ category: 1 });
menuItemSchema.index({ isAvailable: 1 });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
