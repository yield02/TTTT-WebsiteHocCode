const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const replyDiscussSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    discuss_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Discuss",
      required: true,
    },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.ReplyDiscuss ||
  mongoose.model("ReplyDiscuss", replyDiscussSchema);
