const jwt = require("jsonwebtoken");
const chapterManagerService = require("../../services/study/chapter.service");
const ApiError = require("../../utils/apiError");

exports.create = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { data } = req.body;

    var result = await chapterManagerService.create(data, userInfor._id);

    res.status(201).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const result = await chapterManagerService.deleteChapter(
      req.params.course_id,
      req.params.chapter_id,
      userInfor._id
    );
    res.status(204).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.update = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const result = await chapterManagerService.updateChapter(
      req.params.chapter_id,
      req.body.title,
      userInfor._id
    );
    res.status(204).json({});
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getChapterList = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const chapterList = await chapterManagerService.getChapterList(
      req.params.course_id
    );
    res.status(200).json(chapterList || []);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.sortChapter = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await chapterManagerService.sortChapter(
      req.params.course_id,
      req.body.chapters_id,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

// exports.getChapter = async (req, res, next) => {
//   try {
//     const course = await courseManagerService.getById(req.params.id);
//     res.status(200).json(course || "");
//   } catch (error) {
//     return next(new ApiError(error.statusCode, error.message));
//   }
// };

// exports.updateChapter = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const course = await courseManagerService.update(
//       {
//         _id: req.body._id,
//         course_name: req.body.course_name,
//         description: req.body.description,
//       },
//       req.file,
//       userInfor._id
//     );
//     res.status(200).json(course || "");
//   } catch (error) {
//     return next(new ApiError(error.statusCode, error.message));
//   }
// };
