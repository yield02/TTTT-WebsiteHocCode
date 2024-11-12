const express = require("express");
const router = express.Router();
const PostController = require("../../controllers/manager/post-manager.controller");
const ApiError = require("../../utils/apiError");

const jwt = require("jsonwebtoken");

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

router.get("/", PostController.getPosts);

router.patch("/updateStatus", PostController.updateStatusPost);

router.delete("/deletemany/:post_ids", PostController.deletePost);

module.exports = router;
