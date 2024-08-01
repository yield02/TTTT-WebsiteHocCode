const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const courseSchema = new mongoose.Schema(
  {
    course_id: Number,
    subject_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: true,
    },
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    course_name: String,
    image: { type: Object },
    status: {
      state: {
        type: String,
        enum: ["waiting", "active", "banned"],
        default: "active",
      },
      reason: {
        type: String,
        default: "",
      },
    },
    description: String,
    note: {
      type: String,
      default: "",
    },
    enroll: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    waiting_enroll: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    chapters: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  { timestamps: true }
);

courseSchema.plugin(AutoIncrement, { inc_field: "course_id", start_seq: 1000 });

module.exports =
  mongoose.models?.Course || mongoose.model("Course", courseSchema);
