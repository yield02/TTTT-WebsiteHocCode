const Post = require("../../models/Post");
const ApiError = require("../../utils/apiError");

exports.getAllPost = async () => {
  try {
    const posts = await Post.find({});
    return posts;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.updateStatusPost = async (ids, status, reason = "") => {
  try {
    await Post.updateMany(
      { _id: { $in: ids } },
      { status: status, reason: reason }
    );
    return "Success";
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.deletePost = async (ids) => {
  try {
    await Post.deleteMany({ _id: { $in: ids } });
    return "Success";
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
