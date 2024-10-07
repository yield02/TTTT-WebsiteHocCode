const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/apiError");
const CommentService = require("../../services/forum/comment.service");

exports.createComment = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const comment = await CommentService.createComment(req.body, userInfor._id);
    res.status(200).json(comment || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const comments = await CommentService.getCommentsByPostId(
      req.params.post_id
    );
    res.status(200).json(comments || {});
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const comment = await CommentService.deleteComment(
      req.params.comment_id,
      req.params.reply_id,
      userInfor._id
    );
    res.status(200).json(comment || "");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.editComment = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const comment = await CommentService.editComment(req.body, userInfor._id);
    res.status(200).json(comment);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.interactWithComment = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const comment = await CommentService.interactWithComment(
      req.params.comment_id,
      userInfor._id
    );
    res.status(200).json(comment);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
