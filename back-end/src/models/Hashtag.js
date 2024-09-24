const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const hashtagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: false }
);

module.exports =
  mongoose.models?.Hashtag || mongoose.model("Hashtag", hashtagSchema);
