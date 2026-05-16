const dotenv = require('dotenv');
dotenv.config();
const paymentModal = require("../../models/Payment/payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Get all payments
module.exports.getPayments = async (req) => { 
    try {
        const { minAmount, maxAmount, startDate, endDate, status } = req.query;

        const filter = {};
        if (amount) {
            filter.amount = { $gte: minAmount, $lte: maxAmount };
        }

        if (startDate && endDate) {
            filter.paymentDate = { $gte: startDate, $lte: endDate };
        }

        if (status) {
            filter.status = status;
        }

        const payments = await paymentModal.find(filter);
        if (!payments) {
            return ({ status: false, error: "Payments Does Not Exist!!" });
        }

        return ({ status: true, result: payments });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create order by user   
module.exports.processPayment = async (userId, data) => {
    try {

        const myPayment = await stripe.paymentIntents.create({
            amount: data.amount,
            currency: "inr",
            metadata: {
                company: "Ecommerce",
            },
        });

        // data.userId = userId;
        // data.orderDate = Date.now();

        // const order = await OrderModal.create(data);

        return ({ status: true, result: {myPayment, client_secret: myPayment.client_secret} });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create payment 
module.exports.createPayment = async (userId, data) => {
    try {

        data.userId = userId;
        data.paymentDate = Date.now();

        const payment = await paymentModal.create(data);

        return ({ status: true, result: payment });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}
