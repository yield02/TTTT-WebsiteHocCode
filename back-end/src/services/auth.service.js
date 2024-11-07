const User = require("../models/User");
const apiError = require("../utils/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailVerify = require("../utils/sendEmail");
const resize = require("../utils/resize");

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
      const { password, avatar, ...jwtInfor } = user._doc;
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

exports.getUserById = async (user_id) => {
  const user = await User.findById(user_id).select([
    "-password",
    "-announcement",
  ]);
  if (!user) {
    throw new apiError(404, "Tài khoản không tồn tại");
  } else {
    return {
      user: {
        ...user._doc,
        email: user.get("email", null, { getters: false }),
      },
    };
  }
};

exports.getUserInfor = async (username) => {
  const user = await User.findOne({ username: username }).select([
    "-password",
    "-announcement",
  ]);
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
          announcement: [],
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
        announcement: [],
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

exports.verifyEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      throw new apiError(401, "Token không hợp lệ");
    }

    const user = await User.findOneAndUpdate(
      {
        _id: decoded._id,
        "email.data": decoded.email,
      },
      { "email.verify": true },
      { new: true }
    );

    if (!user) {
      throw new apiError(404, "Tài khoản không tồn tại");
    }

    return {
      message: "Xác nhận email thành công",
    };
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};

exports.sendVerifyEmail = async (user_id) => {
  try {
    const user = await User.findById(user_id, ["email.data", "username"]);
    if (!user) {
      throw new apiError(404, "Tài khoản không tồn tại");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 900,
      }
    );

    const email = await EmailVerify.sendingMail({
      from: `${process.env.EMAIL_ADDRESS} no-rep-email`,
      to: user.email,
      subject: "Xác nhận email",
      text: EmailVerify.EmailTextVerify(
        user.username,
        "http://localhost:3000/api/auth/verify-email?token=" + token
      ),
    });
    return user;
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};

exports.sendUnVerifyEmail = async (user_id) => {
  try {
    const user = await User.findById(user_id, ["email.data", "username"]);
    if (!user) {
      throw new apiError(404, "Tài khoản không tồn tại");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 900,
      }
    );

    const email = await EmailVerify.sendingMail({
      from: `${process.env.EMAIL_ADDRESS} no-rep-email`,
      to: user.email,
      subject: "Hủy Liên Kết Email",
      text: EmailVerify.EmailTextUnverified(
        user.username,
        "http://localhost:3000/api/auth/unverify-email?token=" + token
      ),
    });
    return user;
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};

exports.unverifyEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      throw new apiError(401, "Token không hợp lệ");
    }

    const user = await User.findOneAndUpdate(
      {
        _id: decoded._id,
        "email.data": decoded.email,
        "email.verify": true,
      },
      { "email.verify": false },
      { new: true }
    );

    if (!user) {
      throw new apiError(404, "Tài khoản không tồn tại");
    }

    return {
      message: "Hủy xác thực email thành công",
    };
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};

exports.updateAvatar = async (user_id, file) => {
  try {
    if (!file) {
      throw new apiError(400, "Tệp ảnh không tồn tại");
    }

    const user = await User.findById(user_id);

    const buffer = file.buffer;

    var resizeBuffer = await resize.resizeAvatar(buffer);
    var finalImage = {
      contentType: file?.mimetype,
      buffer: Buffer.from(resizeBuffer.toString("base64"), "base64"),
    };

    user.avatar = finalImage;

    const newInforUser = await user.save();

    return {
      user: {
        ...newInforUser._doc,
        password: "",
        announcement: [],
        avatar: {
          contentType: file?.mimetype,
          buffer: resizeBuffer.toString("base64"),
        },
      },
    };
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};
exports.getAnnouncements = async (userId) => {
  try {
    const announcement = await User.findOne({ _id: userId }, [
      "announcement",
    ]).populate([
      {
        path: "announcement.announcer",
        model: "User",
        select: "_id username fullname avatar",
      },
      {
        path: "announcement.post_id",
        model: "Post",
        select: "_id title post_id",
      },
      {
        path: "announcement.course_id",
        model: "Course",
        select: "_id course_name course_id",
      },
    ]);
    return announcement;
  } catch (error) {
    throw new apiError("Server Error", error.message);
  }
};

exports.changeStateOfAnnouncements = async (
  announcement_ids,
  state,
  user_id
) => {
  try {
    const user = await User.findById(user_id);

    if (!user) {
      throw new apiError(404, "Tài khoản không tồn tại");
    }

    user.announcement = user.announcement?.map((item) => {
      if (announcement_ids.includes(item._id.toString())) {
        item.state = state;
      }
      return item;
    });
    await user.save();
    return {
      message: "Thay đổi trạng thái thông báo thành công",
    };
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};

exports.deleteAnnouncements = async (announcement_ids, user_id) => {
  try {
    const user = await User.findById(user_id);

    if (!user) {
      throw new apiError(404, "Tài khoản không tồn tại");
    }

    user.announcement = user.announcement.filter(
      (item) => !announcement_ids.includes(item._id.toString())
    );

    await user.save();

    return {
      message: "Xóa thông báo thành công",
    };
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};
