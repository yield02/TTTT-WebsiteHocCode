const jwt = require("jsonwebtoken");
const DiscussService = require("../services/discuss.service");
const ApiError = require("../utils/apiError");

exports.createDiscuss = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const discuss = await DiscussService.create({
      author_id: userInfor._id,
      lesson_id: req.body.discuss.lesson_id,
      content: req.body.discuss.content,
    });

    res.status(201).json(discuss || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getDiscussByLessonId = async (req, res, next) => {
  try {
    const discusses = await DiscussService.getDiscussByLessonId(
      req.params.lesson_id
    );
    res.status(200).json(discusses || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateDiscussByAuthor = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const discuss = await DiscussService.updateContentDiscuss(
      req.params.discuss_id,
      req.body.content,
      userInfor._id
    );
    res.status(200).json(discuss || {});
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteDiscussByAuthor = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const discuss = await DiscussService.deleteDiscussByAuthor(
      req.params.discuss_id,
      userInfor._id
    );
    res.status(200).json(discuss || {});
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
