const express = require("express");
const paymentHandler = require("../../handler/PaymentHandler/paymentHandler");
const router = express.Router();
const { authUser } = require("../../middleware/authMiddleware");

// router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

router.get("/payments", authUser, paymentHandler.getPayments);
router.post("/payment/process", authUser, paymentHandler.processPayment);
router.post("/payment/new", authUser, paymentHandler.createPayment);

module.exports = router;