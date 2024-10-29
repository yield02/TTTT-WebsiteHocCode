const exerciseService = require("../../services/study/exercise.service");
const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/apiError");

exports.createExercise = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const exercise = await exerciseService.createExercise(
      req.body,
      userInfor._id
    );
    res.json(exercise);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateExercise = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const exercise = await exerciseService.updateExercise(
      req.params.exercise_id,
      req.body,
      userInfor._id
    );
    res.json(exercise);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getExerciseByCourseId = async (req, res, next) => {
  const token = req.cookies.token;
  var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
  try {
    const exercises = await exerciseService.getExerciseByCourseId(
      req.params.course_id,
      req.params.user_id || userInfor._id
    );
    res.json(exercises);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getExerciseByChapterId = async (req, res, next) => {
  const token = req.cookies.token;
  var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
  try {
    const exercises = await exerciseService.getExerciseByChapterId(
      req.params.chapter_id,
      req.params.user_id != "undefined" ? req.params.user_id : userInfor._id
    );
    res.json(exercises);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.createOrUpdateExercise = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const exercise = await exerciseService.createOrUpdateExercise(
      req.body,
      userInfor._id
    );
    res.json(exercise);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
