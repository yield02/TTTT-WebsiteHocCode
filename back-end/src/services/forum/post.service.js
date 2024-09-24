const Post = require("../../models/Post");
const ApiError = require("../../utils/apiError");

exports.createPost = async (body, author_id) => {
  try {
    const post = new Post({
      title: body.title,
      content: body.content,
      topic: body.topic,
      hashtags: body.hashtags,
      author: author_id,
    });
    return await post.save();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
