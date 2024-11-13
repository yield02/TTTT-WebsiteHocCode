const Comment = require("../../models/Comment");
const ApiError = require("../../utils/apiError");

exports.getComments = () => {
  try {
    const comments = Comment.find({});
    return comments;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.updateStatusComments = (commentIds, status, reason = "") => {
  try {
    if (status != "allow" && status != "block") {
      throw new ApiError(400, "Invalid status");
    }

    const comments = Comment.updateMany(
      { _id: { $in: commentIds } },
      { status, reason }
    );
    return comments;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.deleteComments = (commentIds) => {
  try {
    const comments = Comment.deleteMany({ _id: { $in: commentIds } });
    return comments;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};
