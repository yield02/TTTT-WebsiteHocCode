const ApiError = require("../utils/apiError");
const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await authService.signup(body);
    res.status(201).json(user);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.login = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await authService.login(body);
    res
      .status(200)
      .cookie("jwt", user.token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
      .json(user);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getUserinfor = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await authService.getUserInfor(userInfor.username);
    res.status(200).json(user);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
