const HashtagService = require("../../services/forum/hashtag.service");
const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/apiError");

exports.getAllHashTag = async (req, res, next) => {
  try {
    const hashTags = await HashtagService.getAllHashTag();
    res.json(hashTags);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
