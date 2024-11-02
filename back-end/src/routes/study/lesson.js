const express = require("express");
const router = express.Router();
const lessonsController = require("../../controllers/study/lesson.controller");

router.get("/course/:course_id", lessonsController.getLessonByCourseId);
router.get("/chapter/:chapter_id", lessonsController.getLessonList);

router.post("/create", lessonsController.create);

router.patch("/publish/:lessons_id", lessonsController.toggleUpdatePublish);
router.patch("/sort/:chapter_id", lessonsController.sortLesson);
router.patch("/:lesson_id", lessonsController.update);

router.delete("/deletes/:lessons_id", lessonsController.deleteMany);
router.delete("/:chapter_id/:lesson_id", lessonsController.delete);
// router.get("/:id", chapterController.getChapter);

module.exports = router;
