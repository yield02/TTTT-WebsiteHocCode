const Discuss = require("../../models/Discuss");
const ReplyDiscuss = require("../../models/ReplyDiscuss");
const Course = require("../../models/Course");
const ApiError = require("../../utils/apiError");
const Lesson = require("../../models/Lesson");

var mongoose = require("mongoose");
exports.create = async (data) => {
  try {
    if (!data.content || !data.author_id || !data.lesson_id) {
      throw new ApiError("Thông tin yêu cầu không đầy đ��", 400);
    }

    const lesson = await Lesson.findById(data.lesson_id);
    if (!lesson) {
      throw new ApiError("Không tìm thấy bài học", 404);
    }

    const discuss = new Discuss({
      content: data.content,
      author_id: data.author_id,
      course_id: lesson.course_id,
      lesson_id: data.lesson_id,
    });
    return await discuss.save();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getDiscussByLessonId = async (lesson_id) => {
  try {
    const discusses = await Discuss.find({ lesson_id }).sort({
      likes: -1,
      createdAt: -1,
    });
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
    const result = await Discuss.findOneAndDelete({
      _id: discuss_id,
      author_id: author_id,
    });

    if (result && result?.replies?.length > 0) {
      await ReplyDiscuss.deleteMany({ _id: { $in: result.replies } });
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.InteractDiscuss = async (discuss_id, author_id) => {
  try {
    if (!discuss_id || !author_id) {
      throw new ApiError(400, "Thông tin yêu cầu không đầy đ��");
    }
    const result = await Discuss.findById(discuss_id);
    if (result.likes.includes(author_id)) {
      result.likes = result.likes.filter((id) => id != author_id);
    } else {
      result.likes.push(author_id);
    }
    await result.save();
    return result;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getDiscussByCourseId = async (course_id) => {
  try {
    const discusses = Discuss.find({ course_id }).sort({
      likes: -1,
      createdAt: -1,
    });
    return discusses;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.deleteDiscussByAuthorCourse = async (discuss_id, author_id) => {
  try {
    if (!discuss_id) {
      throw new ApiError(
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
      throw new ApiError(404, "Bạn không có quyền truy cập khóa học");
    }
    const result = await Discuss.findByIdAndDelete(discuss_id);
    if (result && result?.replies?.length > 0) {
      await ReplyDiscuss.deleteMany({ _id: { $in: result.replies } });
    }
    return result;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
