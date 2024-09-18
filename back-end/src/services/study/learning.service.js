const Learning = require("../../models/Learning");
const Lesson = require("../../models/Lesson");
const ApiError = require("../../utils/apiError");

exports.createAndUpdateLearning = async (data, course_id, user_id) => {
  try {
    if (!course_id || !user_id) {
      throw new ApiError("Thông tin yêu cầu không đầy đ��", 400);
    }

    if (data.learning_id) {
      const learning = await Learning.findById(data.learning_id);
      //   If the lesson had learned
      if (learning.completed_lessons.includes(data.lesson_id)) {
        learning.current_lesson = data.lesson_id;
        learning.current_chapter = data.chapter_id;
        await learning.save();
        return learning;
      }

      //   If the lesson had not learned
      learning.current_lesson = data.lesson_id;
      learning.current_chapter = data.chapter_id;
      learning.completed_lessons.push(data.lesson_id);
      await learning.save();
      return learning;
    }

    const exists = await Learning.findOne({
      course_id,
      user_id,
    });

    if (exists) {
      throw new ApiError(400, "Thông tin cung cấp không đầy đủ");
    }

    //  If the user had not learned any lesson
    const learning = new Learning({
      course_id,
      user_id,
      current_lesson: data.lesson_id,
      current_chapter: data.chapter_id,
      completed_lessons: [data.lesson_id],
    });
    await learning.save();

    return learning;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.getLearningByUserIdAndCourseId = async (course_id, user_id) => {
  try {
    const learning = await Learning.findOne({
      course_id,
      user_id,
    });
    return learning;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.getAllLearningOfUser = async (user_id) => {
  try {
    const learnings = await Learning.find({
      user_id,
    }).populate("total_lesson");

    console.log(learnings.total_lesson);

    return learnings;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};
