const ApiError = require("../../utils/apiError");
const CourseService = require("../../services/manager/course-manager.service");

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await CourseService.getCourses();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

exports.getLessons = async (req, res, next) => {
  try {
    const lessons = await CourseService.getLessons();
    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { course_ids, state, reason } = req.body;

    const updatedCourse = await CourseService.updateStatus(
      course_ids,
      state,
      reason
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

exports.deleteCourses = async (req, res, next) => {
  try {
    const course_ids = JSON.parse(req.params.course_ids);
    const deletedCourse = await CourseService.deleteCourses(course_ids);
    res.status(200).json(deletedCourse);
  } catch (error) {
    next(error);
  }
};
