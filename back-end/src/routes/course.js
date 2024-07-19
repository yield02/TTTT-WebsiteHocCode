const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const upload = require("../middleware/uploadMiddleware");

router.get("/author", courseController.getCourseAuthor);
router.post("/create", upload.single("image"), courseController.create);
router.patch("/update", upload.single("image"), courseController.updateCourse);
router.get("/", courseController.getCoursesFromSubjectId);
router.get("/:id", courseController.getCourse);
module.exports = router;
