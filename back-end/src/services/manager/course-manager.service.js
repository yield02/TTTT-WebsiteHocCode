const ApiError = require("../../utils/apiError");
const Course = require("../../models/Course");
const Lesson = require("../../models/Lesson");

exports.getCourses = async () => {
  const courses = await Course.find({});
  return courses;
};

exports.getLessons = async () => {
  const lessons = await Lesson.find({});
  return lessons;
};

exports.updateStatus = async (course_ids, state, reason) => {
  try {
    if (state != "waiting" && state != "active" && state != "banned") {
      throw new ApiError(400, "Invalid state");
    }

    const courses = await Course.updateMany(
      {
        _id: { $in: course_ids },
      },
      { status: { state: state, reason: reason } }
    );
    return courses;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.deleteCourses = async (course_ids) => {
  try {
    const courses = await Course.deleteMany({ _id: { $in: course_ids } });

    if (courses) {
      await Lesson.deleteMany({ course_id: { $in: course_ids } });
      return "Success";
    }

    return courses;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};
