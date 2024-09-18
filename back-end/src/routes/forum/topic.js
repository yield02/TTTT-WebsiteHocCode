const express = require("express");
const router = express.Router();
const topicController = require("../../controllers/forum/topic.controller");

router.get("/", topicController.createTopic);

module.exports = router;