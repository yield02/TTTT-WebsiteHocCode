const questionSerivce = require("../../services/study/question.service");
const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/apiError");

exports.createQuestion = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const question = await questionSerivce.createQuestion(
      req.body,
      userInfor._id
    );
    res.status(201).json(question);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.createQuestions = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const questions = req.body;

    const result = await Promise.all(
      questions.map(async (question) => {
        return await questionSerivce.createQuestion(question, userInfor._id);
      })
    );

    res.status(201).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const question = await questionSerivce.updateQuestion(
      req.body,
      userInfor._id
    );
    res.status(200).json(question);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    await questionSerivce.deleteQuestion(req.params.id, userInfor._id);
    res.status(204).send();
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteQuestions = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    await questionSerivce.deleteQuestions(
      JSON.parse(req.params.question_ids),
      userInfor._id
    );
    res.status(204).send();
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getQuestionFromLesson_ids = async (req, res, next) => {
  try {
    const questions = await questionSerivce.getQuestionWithLessonIds(
      JSON.parse(req.params.lesson_ids)
    );
    res.status(200).json(questions);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getQuestionWithQuestion_ids = async (req, res, next) => {
  try {
    const questions = await questionSerivce.getQuestionsWithQuestionIds(
      JSON.parse(req.params.question_ids)
    );
    res.status(200).json(questions);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
