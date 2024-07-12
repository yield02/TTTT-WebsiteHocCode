const mongoose = require("mongoose");

const evaluateSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    course_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: true,
    },
    star: { type: Number, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Evaluate || mongoose.model("Evaluate", evaluateSchema);
