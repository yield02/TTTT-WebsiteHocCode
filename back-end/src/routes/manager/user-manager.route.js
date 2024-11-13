const express = require("express");
const router = express.Router();
const userController = require("../../controllers/manager/user-manager.controller");
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

router.get("/", userController.getAllUsers);

router.patch("/updateStatus", userController.updateStatus);
router.patch("/updateAdminRole", userController.updateAdminRole);

router.delete("/deletemany/:user_ids", userController.deleteUsers);

module.exports = router;
