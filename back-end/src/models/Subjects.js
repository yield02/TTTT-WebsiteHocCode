const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const subjectsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Subject || mongoose.model("Subject", subjectsSchema);
