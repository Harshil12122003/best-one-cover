const express = require("express");
const categoryHandler = require("../../handler/CategoryHandler/categoryHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/categories', categoryHandler.getCategories);
router.get('/category/:id',authUser, categoryHandler.getSingleCategory);
router.post('/category/new',authUser, categoryHandler.createCategory);
router.put('/category/:id',authUser, categoryHandler.updateCategory);
router.delete('/category/:id',authUser, categoryHandler.deleteCategory);

module.exports = router;