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

    const user = await authService.getUserById(userInfor._id);
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

exports.updateInformation = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const result = await authService.updateInformation(userInfor._id, req.body);
    res.status(200).json(result.user);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await authService.changePassword(
      userInfor._id,
      req.body.oldPassword,
      req.body.newPassword
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;
    const result = await authService.verifyEmail(token);
    res.redirect(303, "http://localhost:4200/settings/security");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.sendVerifyEmail = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await authService.sendVerifyEmail(userInfor._id);
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.sendUnVerifyEmail = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await authService.sendUnVerifyEmail(userInfor._id);
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.unverifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;
    const result = await authService.unverifyEmail(token);
    res.redirect(303, "http://localhost:4200/settings/security");
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await authService.updateAvatar(userInfor._id, req?.file);
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.getAnnouncements = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await authService.getAnnouncements(userInfor._id);
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.changeStateOfAnnouncements = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await authService.changeStateOfAnnouncements(
      req.params.announcement_ids,
      req.body.state,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteAnnouncements = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await authService.deleteAnnouncements(
      req.params.announcement_ids,
      userInfor._id
    );
    res.status(200).json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
