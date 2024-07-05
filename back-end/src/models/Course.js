const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const courseSchema = new mongoose.Schema(
  {
    course_id: Number,
    author_id: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    course_name: String,
    image: { type: Object },
    status: {
      type: String,
      enum: ["waiting", "active", "banned"],
      default: "waiting",
    },
    description: String,
    note: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

courseSchema.plugin(AutoIncrement, { inc_field: "course_id", start_seq: 1000 });

module.exports =
  mongoose.models?.Course || mongoose.model("Course", courseSchema);
