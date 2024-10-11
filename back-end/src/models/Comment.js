const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const commentSchema = new mongoose.Schema(
  {
    comment_id: Number,
    content: { type: String, require: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    isReply: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["allow", "block"],
      default: "allow",
    },
    reason: { type: String, required: false },
  },
  { timestamps: true }
);

commentSchema.plugin(AutoIncrement, {
  inc_field: "comment_id",
  start_seq: 1000,
});

module.exports =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);
