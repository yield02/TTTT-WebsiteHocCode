const express = require("express");
const router = express.Router();
const discussController = require("../controllers/discuss.controller");

router.get("/lesson/:lesson_id", discussController.getDiscussByLessonId);
router.post("/create", discussController.createDiscuss);
router.patch("/:discuss_id", discussController.updateDiscussByAuthor);
router.delete("/:discuss_id", discussController.deleteDiscussByAuthor);

module.exports = router;
