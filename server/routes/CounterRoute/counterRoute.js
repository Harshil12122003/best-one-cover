const express = require("express");
const counterHandler = require("../../handler/CounterHandler/counterHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/counters', counterHandler.getCounters);
router.get('/counters/shop',authUser, counterHandler.getShopCounters);
router.get('/counter/:id',authUser, counterHandler.getSingleCounter);
router.post('/counter/new',authUser, counterHandler.createCounter);
router.put('/counter/:id',authUser, counterHandler.updateCounter);

module.exports = router;