const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

const debugOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
        console.log('Last 5 orders:');
        orders.forEach(o => {
            console.log(`Order ${o.orderNumber}: Total=${o.totalAmount} (Type: ${typeof o.totalAmount}), PointsUsed=${o.pointsUsed}`);
            console.log('Items:', o.items);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugOrders();
