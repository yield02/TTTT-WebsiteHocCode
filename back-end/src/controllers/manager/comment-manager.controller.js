const ApiError = require("../../utils/apiError");
const CommentService = require("../../services/manager/comment-manager.service");

exports.getComments = async (req, res, next) => {
  try {
    const comments = await CommentService.getComments();
    res.status(200).json(comments);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateStatusComments = async (req, res, next) => {
  try {
    const { comment_ids, status, reason } = req.body;
    const comments = await CommentService.updateStatusComments(
      comment_ids,
      status,
      reason
    );
    res.status(200).json(comments);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteComments = async (req, res, next) => {
  try {
    const commentIds = JSON.parse(req.params.comment_ids);
    const comments = await CommentService.deleteComments(commentIds);
    res.status(200).json(comments);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
