const express = require("express");
const router = express.Router();
const HashtagController = require("../../controllers/forum/hashtag.controller");

router.get("/", HashtagController.getAllHashTag);

module.exports = router;
