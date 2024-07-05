const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const lessonSchema = new mongoose.Schema(
  {
    lesson_id: Number,
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    title: { type: String, require: true },
    content: { type: Object, require: false },
    video: { type: String, require: false },
    order: { type: Number, require: true },
  },
  { timestamps: true }
);

lessonSchema.plugin(AutoIncrement, {
  inc_field: "lesson_id",
  start_seq: 1000,
});

module.exports =
  mongoose.models?.Lesson || mongoose.model("Lesson", lessonSchema);
