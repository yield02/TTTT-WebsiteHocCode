const sharp = require("sharp");

module.exports = resize = async (buffer) => {
  return await sharp(buffer).resize(300, 150).toBuffer();
};
