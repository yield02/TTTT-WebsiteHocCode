const express = require("express");
const router = express.Router();
const postController = require("../../controllers/forum/post.controller");

router.get("/:post_id", postController.getPostWithId);
router.patch("/content/:post_id", postController.editContentPost);
router.delete("/:post_id", postController.deletePost);
router.post("/", postController.createPost);

module.exports = router;
