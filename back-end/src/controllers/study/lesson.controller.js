const jwt = require("jsonwebtoken");
const lessonService = require("../../services/study/lesson.service");
const ApiError = require("../../utils/apiError");

exports.create = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const lesson = await lessonService.create({ ...req.body }, userInfor._id);
    res.status(201).json(lesson);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteMany = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await lessonService.deleteMany(
      JSON.parse(req.params.lessons_id),
      userInfor._id
    );
    res.status(204).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await lessonService.delete(
      req.params.lesson_id,
      req.params.chapter_id,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
exports.update = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await lessonService.update(
      req.params.lesson_id,
      { ...req.body },
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getLessonList = async (req, res, next) => {
  const token = req.cookies.token;
  var userInfor = "";
  if (token) {
    userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
  try {
    const lessonList = await lessonService.getLessonList(
      req.params.chapter_id,
      userInfor._id
    );
    res.status(200).json(lessonList || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.sortLesson = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await lessonService.sortLesson(
      req.params.chapter_id,
      req.body.lessons_id,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.toggleUpdatePublish = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await lessonService.toggleUpdatePublish(
      JSON.parse(req.params.lessons_id),
      req.body.state,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getLessonByCourseId = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const lessonList = await lessonService.getLessonByCourseId(
      req.params.course_id,
      userInfor._id
    );
    res.status(200).json(lessonList || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
