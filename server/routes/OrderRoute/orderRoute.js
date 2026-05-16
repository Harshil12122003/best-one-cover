const express = require("express");
const orderHandler = require("../../handler/OrderHandler/orderHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/sales',authUser, orderHandler.getSalesReport);
router.get('/profit-report',authUser, orderHandler.getProfitReport);
router.get('/orders',authUser, orderHandler.getOrders);
router.post('/order/new',authUser, orderHandler.createOrder);
router.get('/order/:id',authUser, orderHandler.getSingleOrder);
router.get('/myorders',authUser, orderHandler.getMyOrders);
router.put('/order/:id',authUser, orderHandler.updateOrder);
router.delete('/order/:id',authUser, orderHandler.deleteOrder);

router.get('/notifications',authUser, orderHandler.getNotifications);

module.exports = router;