const Course = require("../models/Course");
const apiError = require("../utils/apiError");
const Chapter = require("../models/Chapter");
const Lesson = require("../models/Lesson");

exports.create = async (data, author_id) => {
  try {
    const injectData = {
      author_id: author_id,
      title: data.title,
    };

    const course = await Course.findById(data.course_id);
    const chapter = new Chapter(injectData);
    const chapterSave = await chapter.save();

    course.chapters.push(chapterSave._id);
    await course.save();

    return {
      chapter: chapterSave._doc,
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getChapterList = async (course_id) => {
  try {
    const course = await Course.findOne({
      _id: course_id,
    });
    if (!course) {
      throw new apiError(
        404,
        "Không tìm thấy khóa học, hoặc bạn không có quyền truy cập"
      );
    }
    var chapterListId = course.chapters;

    const chapterList = await Chapter.find({ _id: { $in: chapterListId } });

    return {
      chapterList: chapterList.map((chapter) => {
        return { ...chapter._doc };
      }),
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.deleteChapter = async (course_id, chapter_id, author_id) => {
  try {
    const course = await Course.findByIdAndUpdate(
      { _id: course_id, author_id: author_id },
      { $pull: { chapters: chapter_id } }
    );
    if (!course) {
      throw new apiError(
        404,
        "Không tìm thấy khóa học, hoặc bạn không có quyền truy cập"
      );
    }
    const chapter = await Chapter.findByIdAndDelete(chapter_id);
    // delete all lessons in lessons.

    if (!chapter) {
      throw new apiError(404, "Chương trình không tồn tại");
    }

    const lesson_ids = chapter._doc.lessons;

    const lessons = await Lesson.deleteMany({ _id: { $in: lesson_ids } });

    return {
      message: "Chương trình đã xóa thành công",
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.updateChapter = async (chapter_id, title, author_id) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(
      { _id: chapter_id, author_id: author_id },
      { title: title }
    );
    if (!chapter) {
      throw new apiError(
        404,
        "Không tìm thấy chương trình, hoặc bạn không có quyền truy cập"
      );
    }
    return {
      chapter: chapter._doc,
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};
