const Discuss = require("../models/Discuss");
const ApiError = require("../utils/apiError");
exports.create = async (data) => {
  try {
    if (!data.content || !data.author_id || !data.lesson_id) {
      throw new ApiError("Thông tin yêu cầu không đầy đ��", 400);
    }
    const discuss = new Discuss({
      content: data.content,
      author_id: data.author_id,
      lesson_id: data.lesson_id,
    });
    return await discuss.save();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getDiscussByLessonId = async (lesson_id) => {
  try {
    const discusses = await Discuss.find({ lesson_id });
    return { discusses: discusses };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.updateContentDiscuss = async (discuss_id, content, author_id) => {
  try {
    if (!discuss_id) {
      throw new ApiError("Thông tin yêu cầu không đầy đủ", 400);
    }
    const result = await Discuss.findByIdAndUpdate(
      discuss_id,
      {
        content: content,
      },
      { new: true }
    );
    return result;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.deleteDiscussByAuthor = async (discuss_id, author_id) => {
  try {
    if (!discuss_id) {
      throw new ApiError(
        400,
        "Thông tin yêu cầu không đầy đủ, hoặc bạn không có quyền truy cập"
      );
    }
    return await Discuss.findOneAndDelete({
      _id: discuss_id,
      author_id: author_id,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
