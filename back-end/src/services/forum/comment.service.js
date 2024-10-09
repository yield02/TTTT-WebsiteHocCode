const { request } = require("express");
const Comment = require("../../models/Comment");
const ApiError = require("../../utils/apiError");
const Post = require("../../models/Post");

exports.createComment = async (data, author_id) => {
  try {
    if (!data.content || !data.post) {
      throw new ApiError(400, "Invalid comment data");
    }

    const post = await Post.findById(data.post);
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    if (post._doc.manager.get("block_comment")) {
      throw new ApiError(403, "Commenting is blocked by the manager");
    }

    const comment = new Comment({
      content: data.content,
      post: data.post,
      author: author_id,
      isReply: data?.reply_id ? true : false,
    });
    await comment.save();

    if (data?.reply_id) {
      const parentComment = await Comment.findByIdAndUpdate(
        data?.reply_id,
        { $push: { replies: comment._id } },
        { new: true }
      );
      if (!parentComment) {
        throw new ApiError(404, "Parent comment not found");
      }
    }
    return comment;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getCommentsByPostId = async (post_id) => {
  try {
    const post = await Post.findOne({ post_id: post_id });
    console.log(post._id);
    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    const query = { post: post._id, status: "allow", isReply: false };

    const comments = await Comment.find(query);
    return { data: comments, totalComments: comments.length };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.deleteComment = async (comment_id, reply_id, author_id) => {
  try {
    const comment = await Comment.findOneAndDelete(
      {
        _id: comment_id,
        status: "allow",
        author: author_id,
      },
      {}
    );

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (reply_id != undefined && reply_id != "undefined") {
      const parentComment = await Comment.findByIdAndUpdate(
        reply_id,
        { $pull: { replies: comment._id } },
        { new: true }
      );
      if (!parentComment) {
        throw new ApiError(404, "Parent comment not found");
      }
    }

    return comment;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.updateContent = async (data, author_id) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      {
        _id: data.comment_id,
        author: author_id,
      },
      { content: data.content },
      { new: true }
    );

    return comment;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.editComment = async (data, author_id) => {
  try {
    if (!data.content) {
      throw new ApiError(400, "Invalid comment data");
    }

    const comment = await Comment.findOneAndUpdate(
      {
        _id: data._id,
        author: author_id,
        status: "allow",
      },
      { content: data.content },
      { new: true }
    );
    return comment;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.interactWithComment = async (comment_id, user_id) => {
  try {
    let comment = await Comment.findById(comment_id);
    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }
    const userIndex = comment.like.indexOf(user_id);
    if (userIndex === -1) {
      comment.like.push(user_id);
    } else {
      comment.like.splice(userIndex, 1);
    }
    await comment.save();
    return comment;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getRepliesWithCommentId = async (comment_id) => {
  try {
    const comment = await Comment.find({
      _id: comment_id,
    }).populate("replies");
    return comment.replies;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getRepliesWithRepliesId = async (replies_id) => {
  try {
    const replies = await Comment.find({
      _id: { $in: replies_id },
    });
    return replies;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
