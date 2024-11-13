const User = require("../../models/User");
const ApiError = require("../../utils/apiError");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Course = require("../../models/Course");

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

exports.updateStatus = async (user_ids, state, reason = "", date) => {
  try {
    const setOptions = { status: { status: state } };

    if (date && state == "block") {
      setOptions.status.date = new Date().setDate(new Date().getDate() + date);
      setOptions.status.reason = reason;

      const blockAllComment = await Comment.updateMany(
        { author_id: { $in: user_ids } },
        { status: "block" }
      );

      const blockAllPost = await Post.updateMany(
        { author_id: { $in: user_ids } },
        { status: "block" }
      );

      const blockAllCourse = await Course.updateMany(
        { author_id: { $in: user_ids } },
        { "status.state": "banned" }
      );
    }

    const result = await User.updateMany(
      { _id: { $in: user_ids } },
      setOptions
    );

    return result;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.deleteUsers = async (user_ids) => {
  try {
    const result = await User.deleteMany({ _id: { $in: user_ids } });
    return result;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.updateAdminRole = async (user_ids, state) => {
  try {
    if (state != "member" && state != "admin") {
      throw new ApiError(400, "Invalid role");
    }

    const result = await User.updateMany(
      { _id: { $in: user_ids } },
      { role: state }
    );
    return result;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
