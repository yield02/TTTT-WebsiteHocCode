const sharp = require("sharp");

exports.resizeCourseImage = async (buffer) => {
  return await sharp(buffer).resize(300, 150).toBuffer();
};

exports.resizeAvatar = async (buffer) => {
  return await sharp(buffer).resize(150, 150).toBuffer();
};
