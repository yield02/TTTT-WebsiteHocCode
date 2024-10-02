const User = require("../models/User");
const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError");
const bcrypt = require("bcrypt");

exports.CheckUserAndRegister = async (data) => {
  const user = await User.findOne({
    "email.data": data.email,
    "email.verify": true,
  }).select("-password");
  if (!user) {
    let newUser = await User.create({
      email: { data: data.email, verify: true },
      fullname: data.name,
      avatar: {
        contentType: "url",
        url: data.picture,
      },
    });

    await newUser.save();

    const { avatar, password, ...userInfor } = newUser._doc;

    const token = jwt.sign(userInfor, process.env.JWT_SECRET_KEY, {
      expiresIn: "12h",
    });

    return token;
  }

  const { avatar, password, ...userInfor } = user._doc;

  const token = jwt.sign(userInfor, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h",
  });
  return token;
};

function isValidString(str) {
  if (!str) {
    return false;
  }

  if (str.includes(" ")) {
    return false;
  }

  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(str);
}

exports.UpdateRequiredInformation = async (user_id, data) => {
  try {
    console.log(data.username);
    if (!isValidString(data.username)) {
      throw new apiError(400, "Invalid username");
    }

    const existsUser = await User.findOne({ username: data.username });

    if (existsUser) {
      throw new apiError(409, "Username already exists");
    }

    const user = await User.findByIdAndUpdate(
      user_id,
      {
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
      },
      { new: true }
    ).select("-password");

    return user._doc;
  } catch (err) {
    throw new apiError(err.statusCode, err.message);
  }
};
