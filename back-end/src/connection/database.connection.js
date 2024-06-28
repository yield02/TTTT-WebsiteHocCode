const mongoose = require("mongoose");

const serverSelectionTimeOutMS = 3000;

async function connect() {
  for (let i = 0; i < 3; i++) {
    try {
      if (!mongoose.connection.readyState) {
        await mongoose.connect("mongodb://localhost:27017/study");
        console.log("Kết nối đến database thành công");
        break;
      }
    } catch (err) {
      console.log("Lỗi kết nối đến database, sẽ thử lại sau 3s");
      throw err;
    }
  }
}
module.exports = { connect };
