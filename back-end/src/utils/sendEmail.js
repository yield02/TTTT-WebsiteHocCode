const nodemailer = require("nodemailer");
const ApiError = require("../utils/apiError");

exports.EmailTextVerify = function (username, link) {
  return `Chào ${username},
Để xác thực email của bạn, vui lòng nhấp vào liên kết sau:
${link}
Liên kết này sẽ hết hạn sau 15 phút.
Nếu bạn không phải là người yêu cầu, vui lòng bỏ qua email này.
Trân trọng,
Công ty trách nhiệm hữu hạn 1 thành viên :v.`;
};

exports.EmailTextUnverified = function (username, link) {
  return `Chào ${username},
Để hủy bỏ liên kết với email của bạn, vui lòng nhấp vào liên kết sau:
${link}
Liên kết này sẽ hết hạn sau 15 phút.
Nếu bạn không phải là người yêu cầu, vui lòng bỏ qua email này.
Trân trọng,
Công ty trách nhiệm hữu hạn 1 thành viên :v.`;
};

//function to send email to the user
exports.sendingMail = async ({ from, to, subject, text }) => {
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
    };
    const Transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    return await Transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
