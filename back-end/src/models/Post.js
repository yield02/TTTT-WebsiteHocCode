const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const postSchema = new mongoose.Schema(
  {
    post_id: Number,
    title: { type: String, required: true },
    content: { type: Object, required: false },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["waiting", "allow", "block"],
      default: "waiting",
    },
    reason: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(AutoIncrement, {
  inc_field: "post_id",
  start_seq: 1000,
});

module.exports = mongoose.models?.Post || mongoose.model("Post", postSchema);