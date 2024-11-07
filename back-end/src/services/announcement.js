const User = require("../models/User");
const ApiError = require("../utils/apiError");

module.exports = class Announcement {
  constructor(announcer, listener) {
    this.announcer = announcer;
    this.listener = listener;
  }

  async LikePost(postId) {
    if (this.announcer == this.listener) {
      return;
    }
    const listener = await User.findById(this.listener);
    listener.announcement.push({
      announcer: this.announcer,
      post_id: postId,
      typeAnnouncement: "like_post",
    });
    await listener.save();
  }

  async CommentPost(postId) {
    if (this.announcer == this.listener) {
      return;
    }
    const listener = await User.findById(this.listener);
    listener.announcement.push({
      announcer: this.announcer,
      post_id: postId,
      typeAnnouncement: "comment",
    });
    await listener.save();
  }

  async LikeComment(commentId, postId) {
    if (this.announcer == this.listener) {
      return;
    }
    const listener = await User.findById(this.listener);
    listener.announcement.push({
      announcer: this.announcer,
      comment_id: commentId,
      post_id: postId,
      typeAnnouncement: "like_comment",
    });
    await listener.save();
  }

  async ReplyComment(commentId, post_id) {
    if (this.announcer == this.listener) {
      return;
    }
    const listener = await User.findById(this.listener);
    listener.announcement.push({
      announcer: this.announcer,
      comment_id: commentId,
      post_id: post_id,
      typeAnnouncement: "reply_comment",
    });
    await listener.save();
  }

  async courseAnnouncement(content, course_id) {
    const listeners = await User.find({
      _id: { $in: this.listener },
    });

    await Promise.all(
      listeners.forEach(async (listener) => {
        listener.announcement.push({
          announcer: this.announcer,
          content: content,
          course_id: course_id,
          typeAnnouncement: "course_announcement",
        });
        await listener.save();
      })
    );
  }
};
