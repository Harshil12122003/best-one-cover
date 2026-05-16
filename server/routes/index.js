const express = require("express");
const router = express.Router();

const authRoute = require('./AuthRoute/authRoute');
const userRoute = require('./UserRoute/userRoute');
const adminRoute = require('./AdminRoute/adminRoute');
const productRoute = require('./ProductRoute/productRoute');
// const cartRoute = require('./CartRoute/cartRoute');
const orderRoute = require('./OrderRoute/orderRoute');
const categoryRoute = require('./CategoryRoute/categoryRoute');
const shopRoute = require('./ShopRoute/shopRoute');
const stockRoute = require('./StockRoute/stockRoute');
const shopOrderRoute = require('./ShopOrderRoute/shopOrderRoute');
const paymentRoute = require('./PaymentRoute/paymentRoute');
const counterRoute = require('./CounterRoute/counterRoute');
const expenseRoute = require('./ExpenseRoute/expenseRoute');
const feedbackRoute = require('./FeedbackRoute/feedbackRoute');
const contactRoute = require('./ContactRoute/contactRoute');

router.use("/api/auth", authRoute);
router.use("/api", userRoute);
router.use("/api", adminRoute);
router.use("/api", productRoute);
// router.use("/api", cartRoute);
router.use("/api", orderRoute);
router.use("/api", categoryRoute);
router.use("/api", shopRoute);
router.use("/api", stockRoute)
router.use("/api", shopOrderRoute);
router.use("/api", paymentRoute);
router.use("/api", counterRoute);
router.use("/api", expenseRoute);
router.use('/api', feedbackRoute);
router.use('/api', contactRoute);

router.get('/', (req, res) => {
  res.send('Backend API is running successfully!');
});

module.exports = router;