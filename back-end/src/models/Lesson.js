const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const lessonSchema = new mongoose.Schema(
  {
    lesson_id: Number,
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    course_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: true,
    },
    chapter_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Chapter",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: Object, required: false },
    video: { type: String, required: false },
    manager: {
      type: Map,
      of: Boolean,
      default: {
        publish: false,
      },
    },
  },
  { timestamps: true }
);

lessonSchema.plugin(AutoIncrement, {
  inc_field: "lesson_id",
  start_seq: 1000,
});

module.exports =
  mongoose.models?.Lesson || mongoose.model("Lesson", lessonSchema);
