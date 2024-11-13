const express = require("express");
const router = express.Router();
const ApiError = require("../../utils/apiError");
const jwt = require("jsonwebtoken");
const CommentController = require("../../controllers/manager/comment-manager.controller");

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
router.get("/", CommentController.getComments);

router.patch("/updateStatus", CommentController.updateStatusComments);

router.delete("/deletemany/:comment_ids", CommentController.deleteComments);

module.exports = router;
