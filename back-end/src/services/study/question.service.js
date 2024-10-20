const Question = require("../../models/Question");
const ApiError = require("../../utils/apiError");

exports.createQuestion = async (data, author_id) => {
  try {
    if (!data.testKey && !data.options && !data.answer) {
      throw new ApiError(400, "Thông tin câu hỏi không đầy đủ");
    }
    console.log(data.lesson_id);
    const question = new Question({
      title: data.title,
      content: data.content,
      type: data.type,
      options: data?.options,
      answer: data?.answer,
      testKey: data?.testKey,
      explanation: data?.explanation,
      author_id: author_id,
      course_id: data.course_id,
      lesson_id: data.lesson_id,
    });
    return await question.save();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.updateQuestion = async (data, author_id) => {
  try {
    const question = await Question.findOneAndUpdate(
      {
        _id: data._id,
        author_id: author_id,
      },
      {
        $set: {
          title: data.title,
          content: data.content,
          type: data.type,
          options: data?.options || [],
          answer: data?.answer || [],
          testKey: data?.testKey || [],
          explanation: data?.explanation,
        },
      },
      { new: true }
    );
    if (!question) {
      throw new ApiError(404, "Không tìm thấy câu h��i");
    }
    return question;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getQuestionWithLessonIds = async (lesson_ids) => {
  try {
    const questions = await Question.find({ lesson_id: { $in: lesson_ids } });
    return questions;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getQuestionWithIds = async (question_ids) => {
  try {
    const questions = await Question.find({ _id: { $in: question_ids } });
    if (questions.length <= 0) {
      throw new ApiError(404, "Không tìm thấy câu h��i");
    }
    return questions;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.deleteQuestions = async (question_ids, author_id) => {
  try {
    await Question.deleteMany({ _id: { $in: question_ids }, author_id });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
