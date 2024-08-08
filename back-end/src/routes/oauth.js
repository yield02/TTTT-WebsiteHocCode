const express = require("express");
const router = express.Router();
const oAuthController = require("../controllers/oauth.controller");

router.get("/information", oAuthController.loginWithGoogle);

router.post("/authentication/google", oAuthController.AuthenticationGoogle);
module.exports = router;
