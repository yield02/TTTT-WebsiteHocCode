const express = require("express");
const router = express.Router();
const lessonsController = require("../controllers/lesson.controller");

router.get("/:chapter_id", lessonsController.getLessonList);
router.post("/create", lessonsController.create);
router.delete("/:chapter_id/:lesson_id", lessonsController.delete);
router.patch("/:lesson_id", lessonsController.update);
// router.get("/:id", chapterController.getChapter);

module.exports = router;
