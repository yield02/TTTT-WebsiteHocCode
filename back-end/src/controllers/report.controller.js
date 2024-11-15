const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const reportService = require("../services/report.service");

exports.createReport = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const report = req.body;
    const newReport = await reportService.createReport(report, userInfor._id);

    return res.status(200).json(newReport);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
