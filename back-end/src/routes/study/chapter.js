const express = require("express");
const router = express.Router();
const chapterController = require("../../controllers/study/chapter.controller");

router.get("/:course_id", chapterController.getChapterList);
router.post("/create", chapterController.create);
router.delete("/:course_id/:chapter_id", chapterController.delete);
router.patch("/:chapter_id", chapterController.update);
// router.get("/:id", chapterController.getChapter);

module.exports = router;
