const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/userinfor", authController.getUserinfor);
router.get("/logout", authController.logout);
router.post("/signUp", authController.signup);
router.post("/login", authController.login);
router.post("/update-information", authController.updateInformation);
router.post("/change-password", authController.changePassword);
module.exports = router;
