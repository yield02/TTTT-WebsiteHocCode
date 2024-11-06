const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/study/course.controller");
const upload = require("../../middleware/uploadMiddleware");

router.get("/author", courseController.getCourseAuthor);
router.get("/courses/:course_ids", courseController.getCoursesByCoursesId);
router.get("/search", courseController.searchCourseWithCourseName);
// For user
router.get("/:course_id", courseController.getCourse);
// For user
router.get("/", courseController.getCoursesFromSubjectId);

router.post("/create", upload.single("image"), courseController.create);

router.patch("/publish/:course_id", courseController.toggleUpdatePublish);
router.patch("/update", upload.single("image"), courseController.updateCourse);
// For Author
router.patch("/enroll/accept/:course_id", courseController.acceptEnroll);
// For Author
router.patch("/enroll/reject/:course_id", courseController.rejectEnroll);
// For user
router.patch("/enroll/register/:course_id", courseController.userEnroll);
// Delete Enroll of use From Author
router.patch(
  "/enroll/delete/:course_id",
  courseController.deleteEnrollFromAuthor
);
// Un subscribe from use
// For user
router.patch("/unenroll/:course_id", courseController.deleteEnrollFromUser);

module.exports = router;
