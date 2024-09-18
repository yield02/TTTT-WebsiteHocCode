const Comment = require("../../models/Comment");
const ApiError = require("../../utils/apiError");

exports.createComment = (data, author_id) => {
  try {
    if (!data.content || !data.post_id) {
      throw new ApiError(400, "Invalid comment data");
    }

    const comment = new Comment({
      content: data.content,
      post: data.post_id,
      user: author_id,
    });
    return comment.save();
  } catch (error) {}
};
