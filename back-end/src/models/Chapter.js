const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const chapterSchema = new mongoose.Schema(
  {
    chapter_id: Number,
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    lessons: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  { timestamps: true }
);

chapterSchema.plugin(AutoIncrement, {
  inc_field: "chapter_id",
  start_seq: 1000,
});

module.exports =
  mongoose.models?.Chapter || mongoose.model("Chapter", chapterSchema);
