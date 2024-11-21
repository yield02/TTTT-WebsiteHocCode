const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    type: { type: String },
    image_url: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.models?.Topic || mongoose.model("Topic", topicSchema);
