const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");

router.get("/:course_id", ratingController.getRatingOfCourse);
router.post("/:course_id", ratingController.createRating);

module.exports = router;
