const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

const debugAllOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const orders = await Order.find();
        console.log(`Total orders found: ${orders.length}`);

        let totalEarned = 0;
        let weirdOrders = [];

        orders.forEach(o => {
            if (typeof o.totalAmount !== 'number' || o.totalAmount > 100) {
                weirdOrders.push({
                    id: o._id,
                    orderNumber: o.orderNumber,
                    total: o.totalAmount,
                    type: typeof o.totalAmount
                });
            }
            totalEarned += (o.totalAmount || 0);
        });

        console.log(`Calculated Total Earned: ${totalEarned}`);
        console.log('Weird Orders (>100 or non-number):', weirdOrders);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugAllOrders();
