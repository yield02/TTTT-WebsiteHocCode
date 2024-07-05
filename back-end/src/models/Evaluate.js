const mongoose = require("mongoose");

const evaluateSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    course_id: { type: mongoose.Schema.ObjectId, ref: "Course", require: true },
    star: { type: Number, require: true },
    description: { type: String, require: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Evaluate || mongoose.model("Evaluate", evaluateSchema);
