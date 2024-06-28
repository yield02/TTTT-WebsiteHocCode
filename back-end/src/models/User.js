const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema(
  {
    user_id: Number,
    avatar: { type: Object, require: false },
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    fullname: { type: String, require: false },
    phone: { type: Object, require: true },
    address: { type: String, require: false },
    gender: { type: Boolean, require: false, default: false },
    status: {
      type: {
        _id: false,
        status: { type: String, require: true },
        reason: { type: String, require: false },
        date: { type: Date, require: false },
      },
      require: true,
      default: { status: "allow" },
    } /* allow, banned */,
    role: {
      type: [
        {
          _id: false,
          roleType: { type: String, require: true },
          roleName: { type: String, require: true },
        },
      ],
      require: true,
      default: [
        {
          roleType: "guest",
          roleName: "Khách",
        },
      ],
    } /* member: Thành Viên Chính Thức, dynamic Thành Viên Năng Động, old: Thành Viên Lâu Năm, admin */,
  },
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, { inc_field: "user_id", start_seq: 1000 });

module.exports = mongoose.models?.User || mongoose.model("User", userSchema);
