const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/course/:course_id", userController.getUsersInCourse);
router.get("/course", userController.getUsersInCourseWithUserName);
router.get("/find", userController.getUsersWithUserName);
router.get("/", userController.getUsers);

module.exports = router;
