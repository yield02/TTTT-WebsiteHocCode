const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const userMask = require("../utils/formatUser");

const userSchema = new mongoose.Schema(
  {
    user_id: Number,
    avatar: { type: Object, require: false }, // if contentType = URL => use URL, else user buffer,
    username: { type: String, require: true },
    password: {
      type: String,
      require: true,
      get: (v) => {
        return "";
      },
    },
    fullname: { type: String, require: false },
    email: {
      type: {
        data: { type: String, require: false },
        verify: { type: Boolean, require: false, default: false },
        hidden: { type: Boolean, require: false, default: false },
      },
      require: false,
      get: (v) => {
        if (v?.hidden == true) {
          return userMask.maskEmail(v?.data);
        }
        return v?.data;
      },
    },
    phone: {
      type: {
        data: { type: String, require: false },
        verify: { type: Boolean, require: false, default: false },
        hidden: { type: Boolean, require: false, default: false },
      },
      require: false,
      get: (v) => {
        if (v?.hidden == true) {
          return userMask.maskPhone(v?.data);
        }
        return v?.data;
      },
    },
    birthday: { type: String, require: false },
    address: {
      type: String,
      require: false,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
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
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
    achievements: {
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
    learning: [{ type: mongoose.Schema.ObjectId, ref: "Course" }],
    announcement: [
      {
        type: new mongoose.Schema(
          {
            course_id: {
              type: mongoose.Schema.ObjectId,
              ref: "Course",
              require: false,
            },
            lesson_id: {
              type: mongoose.Schema.ObjectId,
              ref: "Lesson",
              require: false,
            },
            announcer: {
              type: mongoose.Schema.ObjectId,
              ref: "User",
              require: false,
            },
            post_id: {
              type: mongoose.Schema.ObjectId,
              ref: "Post",
              require: false,
            },
            comment_id: {
              type: mongoose.Schema.ObjectId,
              ref: "Comment",
              require: false,
            },
            typeAnnouncement: {
              type: String,
              enum: [
                "like_post",
                "comment",
                "like_comment",
                "reply_comment",
                "course_announcement",
              ],
              require: false,
            },
            content: { type: String, require: false },
            state: {
              type: String,
              enum: ["unread", "read"],
              default: "unread",
            },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

userSchema.plugin(AutoIncrement, { inc_field: "user_id", start_seq: 1000 });

module.exports = mongoose.models?.User || mongoose.model("User", userSchema);
