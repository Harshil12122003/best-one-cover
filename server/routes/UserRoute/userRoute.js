const express = require("express");
const userHandler = require("../../handler/UserHandler/userHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/users",authUser, userHandler.getUsers);
router.get("/user/profile", authUser, userHandler.getUserProfile);
router.put("/user/updateProfile", authUser, userHandler.updateUserProfile);
router.put("/user/updatePassword", authUser, userHandler.updateUserPassword);
router.get("/user/:id", authUser, userHandler.getSingleUserDetails);
router.delete("/user/delete/:id", authUser, userHandler.deleteUser);


router.post("/password-reset", userHandler.setPasswordToken);
router.post("/password-reset/:userId/:token", userHandler.resetPassword);
router.post("/password-reset/token/valid/:userId/:token", userHandler.validResetPasswordToken);

module.exports = router;