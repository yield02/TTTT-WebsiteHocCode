const ApiError = require("../../utils/apiError");
const Exercise = require("../../models/exercise");

exports.createExercise = async (data, author_id) => {
  // try {
  //   if (!data.course_id || !data.question_id || !data.lesson_id) {
  //     throw new ApiError(400, "Thông tin bài tập không đầy đủ");
  //   }
  //   const exercise = new Exercise({
  //     course_id: data.course_id,
  //     question_id: data.question_id,
  //     lesson_id: data.lesson_id,
  //     chapter_id: data.chapter_id,
  //     code: data.code,
  //     language: data.language,
  //     status: data?.status || false,
  //     author_id: author_id,
  //   });
  //   await exercise.save();
  //   return exercise;
  // } catch (error) {
  //   throw new ApiError(error.statusCode, error.message);
  // }
};

exports.getExerciseById = async (id) => {
  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      throw new ApiError(404, "Bài tập không tìm thấy");
    }
    return exercise;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.getExerciseByChapterId = async (chapter_id, author_id) => {
  try {
    const query = {
      chapter_id: chapter_id,
    };

    if (author_id != "admin") {
      query.author_id = author_id;
    }

    const exercises = await Exercise.find(query);
    return exercises;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.getExerciseByCourseId = async (course_id, user_id) => {
  try {
    const exercises = await Exercise.find({
      course_id: course_id,
      author_id: user_id,
    });
    return exercises;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.updateExercise = async (id, data, author_id) => {
  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      throw new ApiError(404, "Bài tập không tìm thấy");
    }
    if (exercise.author_id !== author_id) {
      throw new ApiError(401, "Bạn không có quyền sửa bài tập này");
    }

    exercise.code = data.code;
    exercise.status = data.status;

    await exercise.save();
    return exercise;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.createOrUpdateExercise = async function (data, author_id) {
  try {
    if (!data.course_id || !data.question_id || !data.lesson_id) {
      throw new ApiError(400, "Thông tin bài tập không đầy đ��");
    }

    let exercise = await Exercise.findOneAndUpdate(
      {
        author_id: author_id,
        _id: { $ne: data._id },
        course_id: data.course_id,
        question_id: data.question_id,
        lesson_id: data.lesson_id,
        chapter_id: data.chapter_id,
      },
      {
        course_id: data.course_id,
        question_id: data.question_id,
        lesson_id: data.lesson_id,
        chapter_id: data.chapter_id,
        code: data.code,
        answer: data.answer,
        language: data.language,
        status: data?.status || false,
        author_id: author_id,
      },
      {
        new: true,
        upsert: true,
      }
    );
    return exercise;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};
