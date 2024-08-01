const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const upload = require("../middleware/uploadMiddleware");

router.get("/author", courseController.getCourseAuthor);
router.post("/create", upload.single("image"), courseController.create);
router.patch("/update", upload.single("image"), courseController.updateCourse);

router.patch("/enroll/accept/:course_id", courseController.acceptEnroll);
router.patch("/enroll/reject/:course_id", courseController.rejectEnroll);

// For user
router.patch("/enroll/register/:course_id", courseController.userEnroll);

// Delete Enroll of use From Admin
router.patch(
  "/enroll/delete/:course_id",
  courseController.deleteEnrollFromAuthor
);
// Un subscribe from use
// For user
router.patch("/unenroll/:course_id", courseController.deleteEnrollFromUser);
// For user
router.get("/", courseController.getCoursesFromSubjectId);
// For user
router.get("/:course_id", courseController.getCourse);
module.exports = router;
