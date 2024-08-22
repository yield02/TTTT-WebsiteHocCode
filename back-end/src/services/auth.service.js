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
    if (
      await bcrypt.compareSync(
        data.password,
        user.get("password", null, { getters: false })
      )
    ) {
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
        email: user.get("email", null, { getters: false }),
      },
    };
  }
};

exports.updateInformation = async (user_id, data) => {
  try {
    if (
      !data.fullname ||
      !data.phone ||
      !data.birthday ||
      !data.gender ||
      !data.address ||
      !user_id
    ) {
      throw new apiError(400, "Thiếu thông tin");
    }

    const existsEmail = await User.findOne({
      "email.data": data.email.data,
      "email.verify": true,
    });

    if (existsEmail && existsEmail?._doc?._id != user_id) {
      throw new apiError(409, "existemail");
    }

    if (!data.email.data || existsEmail?._doc?.email?.verify == true) {
      const user = await User.findByIdAndUpdate(
        user_id,
        {
          fullname: data.fullname,
          "email.hidden": data.email.hidden,
          "phone.data": data.phone.data,
          "phone.hidden": data.phone.hidden,
          birthday: data.birthday,
          gender: data.gender,
          address: data.address,
        },
        { new: true }
      );

      return {
        user: {
          ...user._doc,
          password: "",
        },
      };
    }

    const user = await User.findByIdAndUpdate(
      user_id,
      {
        fullname: data.fullname,
        email: {
          data: data.email.data,
          hidden: data.email.hidden,
        },
        phone: {
          data: data.phone.data,
          hidden: data.phone.hidden,
        },
        birthday: data.birthday,
        gender: data.gender,
        address: data.address,
      },
      { new: true }
    );

    return {
      user: {
        ...user._doc,
        password: "",
      },
    };
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};

exports.changePassword = async (user_id, oldpassword, newpassword) => {
  try {
    const user = await User.findById(user_id);
    if (!user) {
      throw new apiError(404, "Tài khoản không tồn tại");
    }

    if (!bcrypt.compareSync(oldpassword, user._doc.password)) {
      throw new apiError(401, "Mật khẩu cũ không đúng");
    }

    user.password = bcrypt.hashSync(newpassword, 10);
    await user.save();

    return {
      message: "Đổi mật khẩu thành công",
    };
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};
