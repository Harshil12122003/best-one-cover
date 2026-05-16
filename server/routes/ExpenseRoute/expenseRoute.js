const express = require("express");
const expenseHandler = require("../../handler/ExpenseHandler/expenseHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/expenses',authUser, expenseHandler.getExpenses);
router.get('/expenses/shop', authUser, expenseHandler.getShopExpenses);
router.get('/expense/:id',authUser, expenseHandler.getSingleExpense);
router.post('/expense/new',authUser, expenseHandler.createExpense);
router.put('/expense/:id',authUser, expenseHandler.updateExpense);

module.exports = router;