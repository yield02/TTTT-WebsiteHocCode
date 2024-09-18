const jwt = require("jsonwebtoken");
const LearningService = require("../../services/study/learning.service");
const ApiError = require("../../utils/apiError");
exports.createAndUpdateLearning = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const learning = await LearningService.createAndUpdateLearning(
      req.body,
      req.params.course_id,
      userInfor._id
    );
    res.status(200).json(learning);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getLearningByUserIdAndCourseId = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const learning = await LearningService.getLearningByUserIdAndCourseId(
      req.params.course_id,
      userInfor._id
    );
    res.status(200).json(learning);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getAllLearningOfUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const learning = await LearningService.getAllLearningOfUser(userInfor._id);
    res.status(200).json(learning);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
