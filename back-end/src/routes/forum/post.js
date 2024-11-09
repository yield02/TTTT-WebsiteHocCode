const express = require("express");
const router = express.Router();
const postController = require("../../controllers/forum/post.controller");

router.get("/topic/:topic_id", postController.getPostFromTopic);
router.get("/interact/:post_id", postController.interactWithPost);
router.get("/search", postController.searchPostsWithTitle);
router.get("/author", postController.getPostsOfAuthor);
router.get("/:post_id", postController.getPostWithId);

router.post("/", postController.createPost);

router.patch(
  "/manager/block_comment/:post_id",
  postController.toggleBlockComment
);
router.patch("/manager/hidden/:post_id", postController.toggleHiddenPost);
router.patch("/content/:post_id", postController.editContentPost);

router.delete("/:post_id", postController.deletePost);

module.exports = router;
