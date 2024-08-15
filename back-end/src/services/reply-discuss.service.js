const apiError = require("../utils/apiError");
const ReplyDiscuss = require("../models/ReplyDiscuss");
const Discuss = require("../models/Discuss");
const Course = require("../models/Course");

exports.createReplyDiscuss = async (data, author_id) => {
  try {
    if (!data.content || !author_id || !data.discuss_id) {
      throw new apiError(400, "Thông tin yêu cầu không đầy đủ");
    }
    const replyDiscuss = new ReplyDiscuss({
      content: data.content,
      author_id: author_id,
      discuss_id: data.discuss_id,
    });
    await replyDiscuss.save();
    const discuss = await Discuss.findByIdAndUpdate(data.discuss_id, {
      $push: { replies: replyDiscuss._id },
    });
    return replyDiscuss;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getReplyDiscussesFromIds = async (replyDiscusses_id) => {
  try {
    const replies = await ReplyDiscuss.find({
      _id: { $in: replyDiscusses_id },
    });
    return replies;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.UpdateContentReplyDiscuss = async (reply_id, content, author_id) => {
  try {
    if (!reply_id || !content || !author_id) {
      throw new apiError(400, "Thông tin yêu cầu không đầy đủ");
    }
    const result = await ReplyDiscuss.findOneAndUpdate(
      { _id: reply_id, author_id: author_id },
      {
        content: content,
      },
      { new: true }
    );
    return result;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.DeleteReplyDiscussByAuthor = async (
  reply_id,
  discuss_id,
  author_id
) => {
  try {
    if (!reply_id || !author_id || !discuss_id) {
      throw new apiError(400, "Thông tin yêu cầu không đầy đủ");
    }
    const result = await ReplyDiscuss.findOneAndDelete({
      _id: reply_id,
      author_id: author_id,
    });
    if (result) {
      await Discuss.findByIdAndUpdate(discuss_id, {
        $pull: { replies: reply_id },
      });
    }
    return result;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.InteractReplyDiscuss = async (reply_id, author_id) => {
  try {
    if (!reply_id || !author_id) {
      throw new apiError(400, "Thông tin yêu cầu không đầy đủ");
    }
    const result = await ReplyDiscuss.findById(reply_id);
    if (result.likes.includes(author_id)) {
      result.likes = result.likes.filter((id) => id != author_id);
    } else {
      result.likes.push(author_id);
    }
    await result.save();
    return result;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.deleteReplyDiscussByAuthorCourse = async (
  replyDiscusses_id,
  discuss_id,
  author_id
) => {
  try {
    if (!discuss_id || !replyDiscusses_id || !author_id) {
      throw new apiError(
        400,
        "Thông tin yêu cầu không đầy đu��, hoă��c ba��n không có quyền truy câ��p"
      );
    }

    const discuss = await Discuss.findById({
      _id: discuss_id,
    });

    const course = await Course.findOne({
      _id: discuss.course_id,
      author_id: author_id,
    });
    if (!course) {
      throw new apiError(404, "Bạn không có quyền truy cập khóa học");
    }
    discuss.replies = discuss.replies.filter((id) => id != replyDiscusses_id);
    const result = await ReplyDiscuss.findByIdAndDelete(replyDiscusses_id);
    await discuss.save();
    return result;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};
