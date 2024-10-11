const express = require("express");
const router = express.Router();
const lessonsController = require("../../controllers/study/lesson.controller");

router.get("/:chapter_id", lessonsController.getLessonList);

router.post("/create", lessonsController.create);

router.patch("/:lesson_id", lessonsController.update);

router.delete("/:chapter_id/:lesson_id", lessonsController.delete);
// router.get("/:id", chapterController.getChapter);

module.exports = router;
