const express = require("express");
const router = express.Router();
const exerciseController = require("../../controllers/study/exercise.controller");

router.get(
  "/course/:course_id/:user_id",
  exerciseController.getExerciseByCourseId
);
router.get(
  "/chapter/:chapter_id/:user_id",
  exerciseController.getExerciseByChapterId
);

router.post("/", exerciseController.createExercise);

router.patch("/:exercise_id", exerciseController.updateExercise);

router.put("/:exercise_id", exerciseController.createOrUpdateExercise);

module.exports = router;
