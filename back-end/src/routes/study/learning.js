const express = require("express");
const router = express.Router();
const learningController = require("../../controllers/study/learning.controller");

// router.post("/create", subjectController.create);
router.get("/user", learningController.getAllLearningOfUser);
router.get("/:course_id", learningController.getLearningByUserIdAndCourseId);

router.put("/update/:course_id", learningController.createAndUpdateLearning);

module.exports = router;
