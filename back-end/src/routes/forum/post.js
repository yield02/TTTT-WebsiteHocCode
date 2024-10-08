const express = require("express");
const router = express.Router();
const postController = require("../../controllers/forum/post.controller");

router.get("/:post_id", postController.getPostWithId);
router.get("/topic/:topic_id", postController.getPostFromTopic);
router.get("/interact/:post_id", postController.interactWithPost);
router.patch(
  "/manager/block_comment/:post_id",
  postController.toggleBlockComment
);
router.patch("/manager/hidden/:post_id", postController.toggleHiddenPost);
router.patch("/content/:post_id", postController.editContentPost);
router.delete("/:post_id", postController.deletePost);
router.post("/", postController.createPost);

module.exports = router;
