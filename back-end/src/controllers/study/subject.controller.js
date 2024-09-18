const SubjectService = require("../../services/study/subject.service");
const ApiError = require("../../utils/apiError");

exports.create = async (req, res, next) => {
  try {
    const subject = await SubjectService.createSubject(req.body);
    res.status(201).json(subject);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.update = async (req, res, next) => {};

exports.getAll = async (req, res, next) => {
  try {
    const subjects = await SubjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.delete = async (req, res, next) => {};
