const ApiError = require("../../utils/apiError");
const reportService = require("../../services/manager/report-manager.service");

exports.getReports = async (req, res, next) => {
  try {
    const reports = await reportService.getReports();
    res.status(200).json(reports);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateStatusReports = async (req, res, next) => {
  try {
    const { report_ids, state } = req.body;
    const updatedReports = await reportService.updateReport(report_ids, state);
    res.status(200).json(updatedReports);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteReports = async (req, res, next) => {
  try {
    const report_ids = JSON.parse(req.params.report_ids);
    const deletedReports = await reportService.deleteReport(report_ids);
    res.status(200).json(deletedReports);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
