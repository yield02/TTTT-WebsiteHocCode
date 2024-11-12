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
