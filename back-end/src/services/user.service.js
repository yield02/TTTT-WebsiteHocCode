const User = require("../models/User");
const ApiError = require("../utils/apiError");
const formatUser = require("../utils/formatUser");
const Course = require("../models/Course");
const Learning = require("../models/Learning");
const Exercise = require("../models/Exercise");

exports.getUsersInCourse = async (
  course_id,
  filter = { start: 0, end: 0, sort: "desc" },
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
      userIdInCourse =
        filter.sort == "asc"
          ? course[typeList].slice(filter.start, filter.end)
          : course[typeList].reverse().slice(filter.start, filter.end);
    } else {
      userIdInCourse = course[typeList];
    }

    let users = await User.find({ _id: { $in: userIdInCourse } }, [
      "username",
      "email.data",
      "fullname",
      "phone.data",
      "avatar",
    ]);

    const learnings = await Learning.find({
      user_id: { $in: userIdInCourse },
      course_id: course_id,
    });

    const result = await Promise.all(
      users.map(async (user) => {
        const learning = learnings.find((learning) => {
          return (
            JSON.stringify(learning._doc.user_id) ==
            JSON.stringify(user._doc._id)
          );
        });

        const exercises = await Exercise.find({
          course_id,
          author_id: user._doc._id,
        });

        return {
          ...user._doc,
          email: user.email,
          phone: user.phone,
          learning: learning,
          exercises: exercises,
        };
      })
    );

    return result;
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
      ["username", "email", "fullname", "phone", "avatar"]
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
    select: "username email.data fullname phone.data createdAt avatar",
    match: { username: new RegExp(username, "i") },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  return course[typeList];
};

exports.getUsersFromUserId = async (usersId) => {
  try {
    const users = await User.find({ _id: { $in: usersId } }, [
      "_id",
      "username",
      "avatar",
      "fullname",
      "createdAt",
      "avatar",
    ]);
    return users;
  } catch (error) {
    throw new ApiError("Server Error", error.message);
  }
};
