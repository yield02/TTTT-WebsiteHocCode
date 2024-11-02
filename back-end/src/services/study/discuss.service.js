const Discuss = require("../../models/Discuss");
const ReplyDiscuss = require("../../models/ReplyDiscuss");
const Course = require("../../models/Course");
const ApiError = require("../../utils/apiError");
const Lesson = require("../../models/Lesson");
const User = require("../../models/User");
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

    const author = await User.findById(data.author_id).select(
      "username fullname avatar"
    );

    return {
      ...(await discuss.save())._doc,
      author_id: author,
    };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getDiscussByLessonId = async (lesson_id) => {
  try {
    const discusses = await Discuss.find({ lesson_id })
      .sort({
        likes: -1,
        createdAt: -1,
      })
      .populate({
        path: "author_id",
        model: "User",
        select: "username avatar fullname",
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
    const result = await Discuss.findOneAndUpdate(
      { _id: discuss_id, author_id: author_id },
      {
        content: content,
      },
      { new: true }
    );

    if (!result) {
      throw new ApiError("Không tìm thấy bình luận", 404);
    }

    const author = await User.findById(author_id).select(
      "username fullname avatar"
    );

    return {
      ...result._doc,
      author_id: author,
    };
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

    if (!result) {
      throw new ApiError(404, "Không tìm thấy bình luận");
    }

    if (result.likes.includes(author_id)) {
      result.likes = result.likes.filter((id) => id != author_id);
    } else {
      result.likes.push(author_id);
    }

    const author = await User.findById(result.author_id).select(
      "username fullname avatar"
    );

    return {
      ...(await result.save())._doc,
      author_id: author,
    };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getDiscussByCourseId = async (course_id, lesson_id = "all") => {
  try {
    if (lesson_id == "all") {
      const discusses = Discuss.find({ course_id })
        .sort({
          likes: -1,
          createdAt: -1,
        })
        .populate({
          path: "author_id",
          model: "User",
          select: "username avatar fullname",
        });
      return discusses;
    } else {
      const discusses = Discuss.find({ course_id, lesson_id })
        .sort({
          likes: -1,
          createdAt: -1,
        })
        .populate({
          path: "author_id",
          model: "User",
          select: "username avatar fullname",
        });
      return discusses;
    }
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
