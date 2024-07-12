const jwt = require("jsonwebtoken");
const courseManagerService = require("../services/course.service");
const ApiError = require("../utils/apiError");

exports.create = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!req.file) {
      throw new ApiError(400, "Bạn chưa upload hình ảnh");
    }
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const course = await courseManagerService.create(
      {
        course_name: req.body.course_name,
        description: req.body.description,
        author: userInfor._id,
      },
      req.file
    );
    res.status(201).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await courseManagerService.getById(req.params.id);
    res.status(200).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const course = await courseManagerService.update(
      {
        _id: req.body._id,
        course_name: req.body.course_name,
        description: req.body.description,
      },
      req?.file,
      userInfor._id
    );
    res.status(200).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getCourseAuthor = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const courses = await courseManagerService.getByAuthor(userInfor._id);
    res.status(200).json(courses || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
