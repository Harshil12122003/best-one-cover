const express = require("express");
const shopOrderHandler = require("../../handler/ShopOrderHandler/shopOrderHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.post('/shopOrderItemCost',authUser, shopOrderHandler.getShopOrderItemCost);
router.get('/shopOrders',authUser, shopOrderHandler.getShopOrders);
router.get('/shopOrder/me',authUser, shopOrderHandler.getMeOrders);
router.get('/shopOrder/:id',authUser, shopOrderHandler.getSingleShopOrder);
router.post('/shopOrder/new',authUser, shopOrderHandler.createShopOrder);
router.put('/shopOrder/:id',authUser, shopOrderHandler.updateShopOrder);
router.delete('/shopOrder/:id',authUser, shopOrderHandler.deleteShopOrder);

module.exports = router;