const Report = require("../models/Report");
const ApiError = require("../utils/apiError");

exports.createReport = async (report, user_id) => {
  try {
    if (!report.content) {
      throw new ApiError(400, "Invalid report data");
    }

    const newReport = await Report.create({
      cousre_id: report.cousre_id,
      lesson_id: report.lesson_id,
      post_id: report.post_id,
      comment_id: report.comment_id,
      type_report: report.type_report,
      content: report.content,
      reporter_id: user_id,
    });

    await newReport.save();
    return newReport;
  } catch (error) {
    throw new ApiError(err.statusCode, err.message);
  }
};
