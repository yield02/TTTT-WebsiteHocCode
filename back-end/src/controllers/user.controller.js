const ApiError = require("../utils/apiError");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
  try {
    const users_id = JSON.parse(req.query.users);
    const users = await userService.getUsersFromUserId(users_id);
    return res.status(200).json(users);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getUsersInCourse = async (req, res, next) => {
  try {
    const course_id = req.params.course_id;
    const filter = JSON.parse(req.query.filter);
    const typeList = req.query.typeList;
    const token = req.cookies.token;

    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const users = await userService.getUsersInCourse(
      course_id,
      filter,
      typeList,
      userInfor._id
    );

    return res.status(200).json(users);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getUsersWithUserName = async (req, res, next) => {
  try {
    const username = req.query.username;
    const users = await userService.getUsersWithUserName(username);
    return res.status(200).json(users);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getUsersInCourseWithUserName = async (req, res, next) => {
  try {
    const username = req.query.username;
    const course_id = req.query.course_id;
    const typeList = req.query.typeList;

    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const users = await userService.getUsersInCourseWithUserName(
      username,
      course_id,
      userInfor._id,
      typeList
    );
    return res.status(200).json(users);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
