const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    course_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: true,
    },
    lesson_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Lesson",
      required: true,
    },

    chapter_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Chapter",
      required: true,
    },

    question_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
      required: true,
    },
    code: {
      type: Object,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    answer: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Exercise || mongoose.model("Exercise", exerciseSchema);
