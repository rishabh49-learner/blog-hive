const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    impressions: { type: Number, default: 0 },
    minsRead: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
