const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
