const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const upload = require("../middleware/uploadMiddleware");

router.get("/userinfor", authController.getUserinfor);
router.get("/logout", authController.logout);
router.get("/announcement", authController.getAnnouncements);

router.get("/send-verify-email", authController.sendVerifyEmail);
router.get("/verify-email", authController.verifyEmail);

router.get("/send-unverify-email", authController.sendUnVerifyEmail);
router.get("/unverify-email", authController.unverifyEmail);

router.post("/signUp", authController.signup);
router.post("/login", authController.login);
router.post(
  "/update-avatar",
  upload.single("avatar"),
  authController.updateAvatar
);
router.post("/update-information", authController.updateInformation);
router.post("/change-password", authController.changePassword);

router.patch(
  "/announcement/statechange/:announcement_ids",
  authController.changeStateOfAnnouncements
);

router.delete(
  "/announcement/:announcement_ids",
  authController.deleteAnnouncements
);

module.exports = router;
