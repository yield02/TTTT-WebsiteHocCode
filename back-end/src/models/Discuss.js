const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const discussSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    lesson_id: { type: mongoose.Schema.ObjectId, ref: "Lesson", require: true },
    content: { type: String, require: true },
  },
  { timestamps: true }
);

// discussSchema.plugin(AutoIncrement, {
//   inc_field: "chapter_id",
//   start_seq: 1000,
// });

module.exports =
  mongoose.models?.Discuss || mongoose.model("Discuss", discussSchema);
