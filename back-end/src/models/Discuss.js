const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const discussSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    lesson_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Lesson",
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Discuss || mongoose.model("Discuss", discussSchema);
