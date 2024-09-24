const Hashtag = require("../../models/Hashtag");
const ApiError = require("../../utils/apiError");

exports.getAllHashTag = async () => {
  try {
    const hashtags = await Hashtag.find({});
    return hashtags;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
