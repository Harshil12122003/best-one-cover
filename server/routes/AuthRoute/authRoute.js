const express = require("express");
const authHandler = require("../../handler/AuthHandler/authHandler");
// const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.post("/register", authHandler.registerUser);
router.post("/login", authHandler.loginUser);

module.exports = router;