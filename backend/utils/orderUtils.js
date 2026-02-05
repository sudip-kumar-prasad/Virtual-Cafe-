// Generate unique order number
const generateOrderNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `VC-${timestamp}-${random}`;
};

// Calculate order total from items
const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
};

// Validate order total matches item prices
const validateOrderTotal = (items, providedTotal) => {
    const calculatedTotal = calculateOrderTotal(items);
    const tolerance = 0.01; // Allow 1 cent difference for rounding
    return Math.abs(calculatedTotal - providedTotal) < tolerance;
};

module.exports = {
    generateOrderNumber,
    calculateOrderTotal,
    validateOrderTotal
};
