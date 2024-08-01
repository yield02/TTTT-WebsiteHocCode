const User = require("../models/User");
const ApiError = require("../utils/apiError");
const formatUser = require("../utils/formatUser");
const Course = require("../models/Course");

exports.getUsersInCourse = async (
  course_id,
  filter = { start: 0, end: 0 },
  typeList,
  author_id
) => {
  try {
    if (typeList != "enroll" && typeList != "waiting_enroll") {
      throw new ApiError("Bad Request", "Invalid type");
    }
    const course = await Course.findOne({
      _id: course_id,
      author_id: author_id,
    });
    if (!course) {
      throw new ApiError("Not Found", "Course not found");
    }
    let userIdInCourse;
    if (filter.end != 0) {
      userIdInCourse = course[typeList].slice(filter.start, filter.end);
    } else {
      userIdInCourse = course[typeList];
    }

    const users = await User.find({ _id: { $in: userIdInCourse } }, [
      "username",
      "email.data",
      "fullname",
      "phone.data",
    ]);
    return users;
  } catch (error) {
    throw new ApiError("Server Error", error.message);
  }
};

exports.getUsersWithUserName = async (username) => {
  try {
    const users = await User.find(
      {
        username: new RegExp(username, "i"),
      },
      ["username", "email", "fullname", "phone"]
    );
    return users;
  } catch (error) {
    throw new ApiError("Server Error", error.message);
  }
};

exports.getUsersInCourseWithUserName = async (
  username,
  course_id,
  author_id,
  typeList = "enroll"
) => {
  if (typeList != "enroll" && typeList != "waiting_enroll") {
    throw new ApiError(
      "Bad Request",
      "typeList must be enroll or waiting_enroll"
    );
  }

  const course = await Course.findOne({
    _id: course_id,
    author_id: author_id,
  }).populate({
    path: typeList,
    model: "User",
    select: "username email.data fullname phone.data",
    match: { username: new RegExp(username, "i") },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  return course[typeList];
};
