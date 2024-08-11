const User = require("../models/User");
const apiError = require("../utils/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (data) => {
  const userIsExits = await User.exists({ username: data.username });
  if (userIsExits) {
    throw new apiError(409, "Tài khoản đã tồn tại");
  } else {
    const user = new User({
      username: data.username,
      password: bcrypt.hashSync(data.password, 10),
    });
    return await user
      .save()
      .then((res) => {
        return {
          user: { ...res._doc, password: "" },
        };
      })
      .catch((error) => {
        throw new apiError(500, error.message);
      });
  }
};

exports.login = async (data) => {
  const user = await User.findOne({ username: data.username });
  if (!user) {
    throw new apiError(404, "Tài khoản không tồn tại");
  } else {
    if (await bcrypt.compareSync(data.password, user.password)) {
      const { password, ...jwtInfor } = user._doc;
      const token = jwt.sign(jwtInfor, process.env.JWT_SECRET_KEY, {
        expiresIn: "12h",
      });
      return {
        token: token,
        user: {
          ...jwtInfor,
        },
      };
    } else {
      throw new apiError(401, "Sai mật khẩu");
    }
  }
};

exports.getUserInfor = async (username) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    throw new apiError(404, "Tài khoản không tồn tại");
  } else {
    return {
      user: {
        ...user._doc,
        password: "",
      },
    };
  }
};
