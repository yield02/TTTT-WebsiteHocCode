const express = require("express");
const router = express.Router();
const discussController = require("../../controllers/study/discuss.controller");

router.get("/lesson/:lesson_id", discussController.getDiscussByLessonId);
router.get("/course/:course_id", discussController.getDiscussByCourseId);
router.post("/create", discussController.createDiscuss);
router.patch("/likes/:discuss_id", discussController.interactDiscuss);
router.patch("/:discuss_id", discussController.updateDiscussByAuthor);
router.delete(
  "/author/:discuss_id",
  discussController.deleteDiscussByAuthorCourse
);
router.delete("/:discuss_id", discussController.deleteDiscussByAuthor);

module.exports = router;
