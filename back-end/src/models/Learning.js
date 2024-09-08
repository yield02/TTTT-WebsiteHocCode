const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const learningSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    course_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: true,
    },
    current_lesson: {
      type: mongoose.Schema.ObjectId,
      ref: "Lesson",
      required: true,
    },
    current_chapter: {
      type: mongoose.Schema.ObjectId,
      ref: "Chapter",
      required: true,
    },
    completed_lessons: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

learningSchema.virtual("total_lesson", {
  ref: "Lesson",
  localField: "course_id",
  foreignField: "course_id",
  count: true,
});

module.exports =
  mongoose.models?.Learning || mongoose.model("Learning", learningSchema);
