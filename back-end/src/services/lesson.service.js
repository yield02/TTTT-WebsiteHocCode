const apiError = require("../utils/apiError");
const Chapter = require("../models/Chapter");
const Lesson = require("../models/Lesson");

exports.create = async (
  { chapter_id, title, course_id, content, video },
  author_id
) => {
  try {
    if (!chapter_id || !title || !course_id || (!content && !video)) {
      throw new apiError("Thông tin được yêu cầu không đủ!!!", 400);
    }
    const chapter = await Chapter.findOne({
      _id: chapter_id,
      author_id: author_id,
    });
    if (!chapter) {
      throw new apiError("Không tìm thấy chương", 404);
    }

    const videoId = video.split("watch?v=")[1];
    let embedUrl = video;
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    const lesson = new Lesson({
      author_id: author_id,
      title: title,
      course_id: course_id,
      content: content,
      video: embedUrl,
      chapter_id: chapter_id,
    });
    const lessonSave = await lesson.save();
    chapter.lessons.push(lessonSave._id);
    await chapter.save();
    return { lesson: lessonSave._doc };
  } catch (error) {
    throw new apiError(500, "Internal Server Error");
  }
};

exports.update = async (lesson_id, data, author_id) => {
  try {
    console.log(lesson_id, author_id);
    const lesson = await Lesson.findOneAndUpdate(
      { _id: lesson_id, author_id: author_id },
      {
        title: data.title,
        content: data.content,
        video: data.video,
      },
      { new: true }
    );
    if (!lesson) {
      throw new apiError(404, "Không tìm thấy bài học");
    }

    if (data.new_chapter_id != data.old_chapter_id) {
      const oldChapter = await Chapter.findByIdAndUpdate(
        data.old_chapter_id,
        { $pull: { lessons: lesson_id } },
        { new: true }
      );
      const newChapter = await Chapter.findByIdAndUpdate(
        data.new_chapter_id,
        { $push: { lessons: lesson_id } },
        { new: true }
      );
    }

    return { lesson: lesson._doc };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getLessonList = async (chapter_id, user_id) => {
  try {
    const chapter = await Chapter.findOne({
      _id: chapter_id,
    });
    if (!chapter) {
      throw new apiError("Không tìm thấy chương", 404);
    }
    const lessonListId = chapter.lessons;
    const lessonList = await Lesson.find({
      _id: { $in: lessonListId },
    }).populate("course_id");

    return {
      lessons: lessonList.map((lesson) => {
        // When user is author or user was enrolled in the course
        if (
          lesson.author_id === user_id ||
          lesson.course_id.enroll.includes(user_id)
        ) {
          return { ...lesson._doc, course_id: lesson._doc.course_id._id };
        }
        // When user is not author and user was not enrolled in the course
        else {
          return {
            ...lesson._doc,
            content: "",
            video: "",
            course_id: lesson._doc.course_id._id,
          };
        }
      }),
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.delete = async (lesson_id, chapter_id, author_id) => {
  try {
    const lesson = await Lesson.findOneAndDelete({
      _id: lesson_id,
      author_id: author_id,
    });
    if (!lesson) {
      throw new apiError("Không tìm thấy bài học", 404);
    }
    const chapter = await Chapter.findByIdAndUpdate(
      chapter_id,
      { $pull: { lessons: lesson_id } },
      { new: true }
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
};
