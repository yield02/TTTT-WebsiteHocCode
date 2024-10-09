const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    type: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models?.Topic || mongoose.model("Topic", topicSchema);
