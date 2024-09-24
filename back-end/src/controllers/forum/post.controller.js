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
