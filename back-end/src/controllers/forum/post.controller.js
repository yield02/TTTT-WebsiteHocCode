const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/apiError");
const postService = require("../../services/forum/post.service");

exports.createPost = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const post = await postService.createPost(req.body, userInfor._id);
    res.status(201).json(post);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getPostWithId = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
      try {
        const post = await postService.getPostWithId(
          req.params.post_id,
          user?._id
        );
        res.status(200).json(post);
      } catch (error) {
        return next(new ApiError(error.statusCode, error.message));
      }
    });
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.editContentPost = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const post = await postService.editContent(
      req.params.post_id,
      req.body,
      userInfor._id
    );
    res.status(200).json(post);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const post = await postService.deletePost(
      req.params.post_id,
      userInfor._id
    );
    res.status(200).json(post);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getPostFromTopic = async (req, res, next) => {
  try {
    const posts = await postService.getPostFromTopic(
      req.params.topic_id,
      req.query
    );

    res.status(200).json(posts);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
