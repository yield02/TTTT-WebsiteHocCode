const User = require("../../models/User");
const ApiError = require("../../utils/apiError");

exports.getUsers = async () => {
  try {
    const users = await User.find({})
      .select(["-password", "-learning", "-announcement"])
      .then((users) => {
        return users.map((user) => ({
          ...user._doc,
          email: user._doc?.email?.data || "",
          phone: user._doc?.phone?.data || "",
        }));
      });
    return users;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
