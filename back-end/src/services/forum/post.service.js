const Post = require("../../models/Post");
const ApiError = require("../../utils/apiError");
const Announcement = require("../announcement");

exports.createPost = async (body, author_id) => {
  try {
    const post = new Post({
      title: body.title,
      content: body.content,
      topic: body.topic,
      hashtags: body.hashtags,
      author_id: author_id,
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
    if (
      !post ||
      (post._doc.manager.get("hidden") && post.author_id != user_id)
    ) {
      throw new ApiError(404, "Post not found");
    }
    // condition to select with admin permissions
    if (
      post.status == "allow" ||
      post.author_id == user_id ||
      user_id == "admin"
    ) {
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
      { post_id: post_id, author_id: user_id },
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
      author_id: user_id,
      status: { $ne: "block" },
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
    const query = { topic: topic_id, status: "allow", "manager.hidden": false };

    if (filter?.name) {
      query.title = { $regex: filter.name, $options: "i" };
    }

    if (filter?.time && filter?.time !== "any") {
      const date = new Date();
      date.setDate(date.getDate() - filter.time);
      query.createdAt = { $gte: date };
    }

    if (filter?.author) {
      query.author_id = filter.author;
    }

    if (filter?.hashtags) {
      hashtags = JSON.parse(filter.hashtags);
      if (hashtags.length > 0) {
        query.hashtags = { $in: hashtags };
      }
    }

    const options = {
      sort: {
        like: "desc",
        createdAt: filter?.sortTime === "asc" ? 1 : -1,
      },
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

exports.interactWithPost = async (post_id, user_id) => {
  try {
    const post = await Post.findOne({ post_id: post_id });
    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    const announcement = new Announcement(user_id, post.author_id);
    const userIndex = post.like.indexOf(user_id);
    if (userIndex === -1) {
      post.like.push(user_id);
      await announcement.LikePost(post._id);
    } else {
      post.like.splice(userIndex, 1);
    }
    await post.save();
    return post;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.toggleBlockComment = async (post_id, author_id) => {
  try {
    const post = await Post.findOne({ post_id: post_id });
    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    if (post.author_id != author_id && author_id != "admin") {
      throw new ApiError(403, "Unauthorized");
    }

    post._doc.manager.set(
      "block_comment",
      !post._doc.manager.get("block_comment")
    );
    await post.save();

    return post;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.toggleHiddenPost = async (post_id, author_id) => {
  try {
    const post = await Post.findOne({ post_id: post_id });
    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    if (post.author_id != author_id && author_id != "admin") {
      throw new ApiError(403, "Unauthorized");
    }

    post._doc.manager.set("hidden", !post._doc.manager.get("hidden"));

    await post.save();

    return post;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.searchPostsWithTitle = async (title) => {
  try {
    const posts = await Post.find({
      title: { $regex: title, $options: "i" },
      status: "allow",
      "manager.hidden": false,
    }).populate({
      path: "author_id",
      select: "username fullname",
    });
    return posts;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getPostsOfAuthor = async (author_id) => {
  try {
    const posts = await Post.find({ author_id: author_id });
    return posts;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.updateView = async (_id) => {
  try {
    const post = await Post.findByIdAndUpdate(
      _id,
      { $inc: { views: 1 } },
      { new: true }
    );
    return post;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
