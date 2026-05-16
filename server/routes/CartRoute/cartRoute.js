const express = require("express");
const cartHandler = require("../../handler/CartHandler/cartHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/carts',authUser, cartHandler.getCarts);
router.post('/cart',authUser, cartHandler.createCart);
router.delete('/cart/:id',authUser, cartHandler.deleteCart);

module.exports = router;