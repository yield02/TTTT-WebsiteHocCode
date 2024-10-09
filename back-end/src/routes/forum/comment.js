const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/forum/comment.controller");

router.get("/post/:post_id", commentController.getCommentsByPostId);
router.get("/replies/:comment_id", commentController.getRepliesWithCommentId);
router.get("/replies", commentController.getRepliesWithRepliesId);
router.patch("/interact/:comment_id", commentController.interactWithComment);
router.patch("/content/:comment_id", commentController.editComment);
router.delete("/:comment_id/:reply_id", commentController.deleteComment);
router.post("/", commentController.createComment);

module.exports = router;
