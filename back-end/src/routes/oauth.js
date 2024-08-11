const express = require("express");
const router = express.Router();
const oAuthController = require("../controllers/oauth.controller");

router.get("/information/google", oAuthController.loginWithGoogle);

router.post("/authentication/google", oAuthController.AuthenticationGoogle);
router.post(
  "/update-required-information",
  oAuthController.UpdateRequiredInformation
);
module.exports = router;
