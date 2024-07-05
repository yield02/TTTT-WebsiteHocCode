const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const chapterSchema = new mongoose.Schema(
  {
    chapter_id: Number,
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    title: { type: String, require: true },
    order: { type: Number, require: true },
  },
  { timestamps: true }
);

chapterSchema.plugin(AutoIncrement, {
  inc_field: "chapter_id",
  start_seq: 1000,
});

module.exports =
  mongoose.models?.Chapter || mongoose.model("Chapter", chapterSchema);
