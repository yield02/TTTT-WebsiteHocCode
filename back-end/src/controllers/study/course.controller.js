const jwt = require("jsonwebtoken");
const courseManagerService = require("../../services/study/course.service");
const ApiError = require("../../utils/apiError");

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
        subject_id: req.body.subject_id,
        author_id: userInfor._id,
      },
      req.file
    );
    res.status(201).json(course || "");
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
        subject_id: req.body.subject_id,
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

exports.getCoursesFromSubjectId = async (req, res, next) => {
  try {
    const courses = await courseManagerService.getBySubjectId(
      JSON.parse(req.query.subject_id)
    );
    res.status(200).json(courses || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await courseManagerService.getById(req.params.course_id);
    res.status(200).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getCoursesByCoursesId = async (req, res, next) => {
  try {
    const courses = await courseManagerService.getCoursesById(
      req.params.course_ids
    );
    res.status(200).json(courses || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.userEnroll = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const course = await courseManagerService.userEnroll(
      req.params.course_id,
      userInfor._id
    );
    res.status(200).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
exports.acceptEnroll = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const course = await courseManagerService.acceptEnroll(
      req.params.course_id,
      req.body.user_id,
      userInfor._id
    );
    res.status(200).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
exports.rejectEnroll = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const course = await courseManagerService.rejectEnroll(
      req.params.course_id,
      req.body.user_id,
      userInfor._id
    );
    res.status(200).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteEnrollFromAuthor = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const course = await courseManagerService.deleteEnrollFromAuthor(
      req.params.course_id,
      req.body.users_id,
      userInfor._id
    );
    res.status(200).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteEnrollFromUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const course = await courseManagerService.deleteEnrollFromUser(
      req.body.course_id,
      userInfor._id
    );
    res.status(200).json(course || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.searchCourseWithCourseName = async (req, res, next) => {
  try {
    const courses = await courseManagerService.searchCourseWithCourseName(
      req.query.course_name
    );
    res.status(200).json(courses || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
