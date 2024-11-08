const express = require("express");
const router = express.Router();
const chapterController = require("../../controllers/study/chapter.controller");

router.get("/:course_id", chapterController.getChapterList);

router.post("/create", chapterController.create);

router.patch("/sort/:course_id", chapterController.sortChapter);
router.patch("/:chapter_id", chapterController.update);

router.delete("/:course_id/:chapter_id", chapterController.delete);
// router.get("/:id", chapterController.getChapter);

module.exports = router;
