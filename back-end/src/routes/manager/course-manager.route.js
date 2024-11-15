const express = require("express");
const router = express.Router();
const ApiError = require("../../utils/apiError");
const CourseController = require("../../controllers/manager/course-manager.controller");

const jwt = require("jsonwebtoken");

router.use(function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(new ApiError(403, "Unauthorized"));
    }

    if (user.role == "admin") {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  });
});

router.get("/courses", CourseController.getCourses);
router.get("/lessons", CourseController.getLessons);

router.patch("/courses/updateStatus", CourseController.updateStatus);

router.delete(
  "/courses/deletemany/:course_ids",
  CourseController.deleteCourses
);

module.exports = router;
