const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["code", "choice", "multichoice"],
    },
    options: { type: [], required: false },
    answer: { type: [], required: false },
    explanation: { type: String, required: false },
    testKey: {
      type: [
        {
          input: { type: String, required: true },
          output: { type: String, required: true },
        },
      ],
      required: false,
    },
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
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Question || mongoose.model("Question", questionSchema);
