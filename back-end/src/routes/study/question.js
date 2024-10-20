const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/study/question.controller");

router.get(
  "/questions/:question_ids",
  questionController.getQuestionWithQuestion_ids
);
router.get(
  "/lessons/:lesson_ids",
  questionController.getQuestionFromLesson_ids
);

router.post("/create", questionController.createQuestion);
router.post("/createmany", questionController.createQuestions);

router.patch("/update/:question_id", questionController.updateQuestion);

router.delete("/:question_ids", questionController.deleteQuestions);
module.exports = router;
