const ApiError = require("../../utils/apiError");
const UserService = require("../../services/manager/user-manager.service");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { user_ids, status, reason, date } = req.body;
    const result = await UserService.updateStatus(
      user_ids,
      status,
      reason,
      date
    );
    res.json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    const user_ids = JSON.parse(req.params.user_ids);
    const result = await UserService.deleteUsers(user_ids);
    res.json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

exports.updateAdminRole = async (req, res, next) => {
  try {
    const { user_ids, state } = req.body;
    const result = await UserService.updateAdminRole(user_ids, state);
    res.json(result);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
