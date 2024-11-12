const ApiError = require("../../utils/apiError");
const PostService = require("../../services/manager/post-manager.service");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await PostService.getAllPost();
    res.json(posts);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateStatusPost = async (req, res, next) => {
  try {
    const post = await PostService.updateStatusPost(
      req.body.post_ids,
      req.body.status,
      req.body.reason
    );
    res.json("success");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await PostService.deletePost(JSON.parse(req.params.post_ids));
    res.json("success");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
