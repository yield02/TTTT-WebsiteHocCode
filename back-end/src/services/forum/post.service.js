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

exports.getPostWithId = async (post_id, user_id) => {
  try {
    const post = await Post.findOne({
      post_id: post_id,
    });
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    // condition to select with admin permissions
    if (post.status == "allow" || post.author == user_id) {
      return post;
    }

    throw new ApiError(403, "Unauthorized");
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.editContent = async (post_id, data, user_id) => {
  try {
    if (!data.title || !data.content) {
      throw new ApiError(400, "Missing required fields");
    }

    const post = await Post.findOneAndUpdate(
      { post_id: post_id, author: user_id },
      {
        content: data.content,
        title: data.title,
      },
      { new: true }
    );
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    return post;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.deletePost = async (post_id, user_id) => {
  try {
    const post = await Post.findOneAndDelete({
      post_id: post_id,
      author: user_id,
    });
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    return post;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
