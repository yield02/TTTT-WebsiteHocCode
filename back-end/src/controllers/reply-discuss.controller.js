const jwt = require("jsonwebtoken");
const replyDiscussService = require("../services/reply-discuss.service");
const ApiError = require("../utils/apiError");

exports.createReplyDiscuss = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const result = await replyDiscussService.createReplyDiscuss(
      req.body,
      userInfor._id
    );

    res.status(200).json(result || {});
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getReplyDiscussesFromIds = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await replyDiscussService.getReplyDiscussesFromIds(
      JSON.parse(req.query.replyDiscusses_id)
    );
    res.status(200).json(result || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateContentReplyDiscuss = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await replyDiscussService.UpdateContentReplyDiscuss(
      req.params.reply_id,
      req.body.content,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteReplyDiscussByAuthor = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await replyDiscussService.DeleteReplyDiscussByAuthor(
      req.params.reply_id,
      req.params.discuss_id,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.interactReplyDiscuss = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await replyDiscussService.InteractReplyDiscuss(
      req.params.reply_id,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
