const express = require("express");
const router = express.Router();
const ApiError = require("../../utils/apiError");
const jwt = require("jsonwebtoken");
const reportController = require("../../controllers/manager/report-manager.controller");

router.use(function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(new ApiError(403, "Unauthorized"));
    }

    if (user.role == "admin") {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  });
});

router.get("/", reportController.getReports);

router.patch("/updateStatus", reportController.updateStatusReports);

router.delete("/deletemany/:report_ids", reportController.deleteReports);

module.exports = router;
