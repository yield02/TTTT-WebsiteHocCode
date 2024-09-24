const express = require("express");
const router = express.Router();
const postController = require("../../controllers/forum/post.controller");

router.post("/", postController.createPost);

module.exports = router;
