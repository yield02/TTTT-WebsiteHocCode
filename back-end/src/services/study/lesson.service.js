const apiError = require("../../utils/apiError");
const Chapter = require("../../models/Chapter");
const Lesson = require("../../models/Lesson");
const VideoUtils = require("../../utils/getVideo");

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

    const videoId =
      video.length == 11 || video.length == 0
        ? video
        : VideoUtils.getYoutubeVideoId(video);

    if (!videoId && video.length != 0) {
      throw new apiError(400, "Link video không hợp lệ, phải sử dụng youtube");
    }

    const lesson = new Lesson({
      author_id: author_id,
      title: title,
      course_id: course_id,
      chapter_id: chapter_id,
      content: content,
      video: videoId,
      chapter_id: chapter_id,
    });
    const lessonSave = await lesson.save();
    chapter.lessons.push(lessonSave._id);
    await chapter.save();
    return { lesson: lessonSave._doc };
  } catch (error) {
    console.log(error);
    throw new apiError(500, error.message);
  }
};

exports.update = async (lesson_id, data, author_id) => {
  try {
    const videoId =
      data.video.length == 11 || data.video.length == 0
        ? data.video
        : VideoUtils.getYoutubeVideoId(video);

    if (!videoId && data.video.length != 0) {
      throw new apiError(400, "Link video không hợp lệ, phải sử dụng youtube");
    }

    const lesson = await Lesson.findOneAndUpdate(
      { _id: lesson_id, author_id: author_id },
      {
        title: data.title,
        chapter_id: data.new_chapter_id,
        content: data.content,
        video: videoId || data.video,
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
    console.log(error);
    throw new apiError(500, error.message);
  }
};

exports.toggleUpdatePublish = async (lessons_id, state, author_id) => {
  try {
    let lessons = await Lesson.find({
      _id: { $in: lessons_id },
      author_id: author_id,
    });
    if (lessons.length < 0) {
      throw new apiError(404, "Không tìm thấy bài học");
    }

    if (
      state != "" &&
      state != "publish" &&
      state != "hidden" &&
      state != undefined
    ) {
      throw new apiError(400, "Trạng thái phải là 'publish' hoặc 'hidden'");
    }

    if (!state) {
      lessons = await Promise.all(
        lessons.map(async (lesson) => {
          lesson.manager.set("publish", !lesson.manager.get("publish"));
          return await lesson.save();
        })
      );
    } else {
      lessons = await Promise.all(
        lessons.map(async (lesson) => {
          lesson.manager.set("publish", state === "publish");
          return await lesson.save();
        })
      );
    }

    return lessons;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.deleteMany = async (lessons_id, author_id) => {
  try {
    const lesson = await Lesson.findById(lessons_id[0]);

    const lessons = await Lesson.deleteMany({
      _id: { $in: lessons_id },
      author_id: author_id,
    });
    if (lessons.deletedCount === 0) {
      throw new apiError(404, "Không tìm thấy bài học");
    }

    const chapter = await Chapter.findByIdAndUpdate(
      lesson.chapter_id,
      { $pull: { lessons: { $in: lessons_id } } },
      { new: true }
    );
    if (!chapter) {
      throw new apiError("Không tìm thấy chương", 404);
    }
    return chapter;
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
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
          lesson.author_id == user_id ||
          (lesson.course_id.enroll.includes(user_id) &&
            lesson.manager.get("publish"))
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

exports.sortLesson = async (chapter_id, lessons_id, author_id) => {
  try {
    const chapter = await Chapter.findOneAndUpdate(
      {
        _id: chapter_id,
        author_id: author_id,
      },
      { $set: { lessons: lessons_id } },
      { new: true }
    );
    if (!chapter) {
      throw new apiError("Không tìm thấy chương", 404);
    }
    return chapter;
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};

exports.getLessonByCourseId = async (course_id, author_id) => {
  try {
    const lessons = await Lesson.find({ course_id, author_id });
    return lessons;
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};
