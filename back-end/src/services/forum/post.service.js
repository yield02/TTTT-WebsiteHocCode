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

exports.getPostFromTopic = async (topic_id, filter) => {
  try {
    console.log(filter);
    const query = { topic: topic_id, status: "allow" };

    if (filter?.name) {
      query.title = { $regex: filter.name, $options: "i" };
    }

    if (filter?.time && filter?.time !== "any") {
      const date = new Date();
      date.setDate(date.getDate() - filter.time);
      query.createdAt = { $gte: date };
    }

    if (filter?.author) {
      query.author = filter.author;
    }

    if (filter?.hashtags) {
      hashtags = JSON.parse(filter.hashtags);
      if (hashtags.length > 0) {
        query.hashtags = { $in: hashtags };
      }
    }

    const options = {
      sort: { createdAt: filter?.sortTime === "asc" ? 1 : -1 },
      skip: (filter?.page - 1) * 10,
      limit: 10,
    };

    const posts = await Post.find(query, null, options);
    const totalPosts = await Post.countDocuments(query);

    return { data: posts, totalPosts };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
