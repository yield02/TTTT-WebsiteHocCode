const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    course_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: true,
    },
    star: { type: Number, min: 1, max: 5, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Rating || mongoose.model("Rating", ratingSchema);
