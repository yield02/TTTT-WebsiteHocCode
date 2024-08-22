const jwt = require("jsonwebtoken");
const RatingService = require("../services/rating.service");
const ApiError = require("../utils/apiError");

exports.createRating = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const rating = await RatingService.createRating(
      req.body,
      req.params.course_id,
      userInfor._id
    );
    res.status(201).json(rating);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getRatingOfCourse = async (req, res, next) => {
  try {
    const rating = await RatingService.getRatingOfCourse(req.params.course_id);
    res.status(200).json(rating);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
