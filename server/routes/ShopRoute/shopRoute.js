const express = require("express");
const shopHandler = require("../../handler/ShopHandler/shopHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/shops',authUser, shopHandler.getShops);
router.get('/shop/:id',authUser, shopHandler.getSingleShop);
router.post('/shop/new',authUser, shopHandler.createShop);
router.put('/shop/:id',authUser, shopHandler.updateShop);
router.delete('/shop/:id',authUser, shopHandler.deleteShop);

module.exports = router;