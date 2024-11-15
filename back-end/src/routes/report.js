const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");

// router.get("/information/google", oAuthController.loginWithGoogle);

router.post("/", reportController.createReport);

module.exports = router;
