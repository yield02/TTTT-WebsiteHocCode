const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ReportSchema = new mongoose.Schema(
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
    reporter_id: {
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
    type_report: {
      type: String,
      enum: ["post", "comment", "course", "lesson"],
      require: false,
    },
    content: { type: String, require: false },
    state: {
      type: String,
      enum: ["unprocessed", "processed"],
      default: "unprocessed",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Report || mongoose.model("Report", ReportSchema);
