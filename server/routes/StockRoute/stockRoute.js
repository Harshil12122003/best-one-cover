const express = require("express");
const stockHandler = require("../../handler/StockHandler/stockHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/stocks',authUser, stockHandler.getStocks);
router.get('/stock/:id',authUser, stockHandler.getSingleStock);
router.post('/stock/new',authUser, stockHandler.createStock);
router.put('/stock/:id',authUser, stockHandler.updateStock);
router.delete('/stock/:id',authUser, stockHandler.deleteStock);

module.exports = router;