const express = require("express");
const router = express.Router();
const replyDiscussController = require("../controllers/reply-discuss.controller");

router.get("/", replyDiscussController.getReplyDiscussesFromIds);
router.post("/", replyDiscussController.createReplyDiscuss);
router.patch("/likes/:reply_id", replyDiscussController.interactReplyDiscuss);
router.patch("/:reply_id", replyDiscussController.updateContentReplyDiscuss);
router.delete(
  "/author/:discuss_id/:reply_id",
  replyDiscussController.deleteReplyDiscussByAuthorCourse
);
router.delete(
  "/:discuss_id/:reply_id",
  replyDiscussController.deleteReplyDiscussByAuthor
);
module.exports = router;
