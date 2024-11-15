const ApiError = require("../../utils/apiError");
const Report = require("../../models/Report");

exports.getReports = async () => {
  try {
    const reports = await Report.find().populate("lesson_id");
    return reports;
  } catch (error) {
    throw new ApiError(err.statusCode, err.message);
  }
};

exports.updateReport = async (report_ids, state) => {
  try {
    if (state != "unprocessed" && state != "processed") {
      throw new ApiError(400, "Invalid state");
    }

    const updatedReports = await Report.updateMany(
      { _id: { $in: report_ids } },
      { state: state }
    );
    return updatedReports;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.deleteReport = async (report_ids) => {
  try {
    const deletedReports = await Report.deleteMany({
      _id: { $in: report_ids },
    });
    return deletedReports;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
