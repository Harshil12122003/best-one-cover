const express = require("express");
const adminHandler = require("../../handler/AdminHandler/adminHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.post("/admin/createAdmin", adminHandler.createAdmin);
router.post("/admin/login", adminHandler.loginAdmin);

router.get("/admins", authUser, adminHandler.getAdmins);
router.get("/admin/profile", authUser, adminHandler.getAdminProfile);
router.get("/admin/:id", authUser, adminHandler.getSingleAdminDetails);
router.put("/admin/updateProfile", authUser, adminHandler.updateAdminProfile);
router.put("/admin/updatePassword", authUser, adminHandler.updateAdminPassword);
router.delete("/admin/delete/:id", authUser, adminHandler.deleteAdmin);

router.post("/admin/password-reset", adminHandler.setPasswordToken);
router.post("/admin/password-reset/:userId/:token", adminHandler.resetPassword);
router.post("/admin/password-reset/token/valid/:userId/:token", adminHandler.validResetPasswordToken);

module.exports = router;