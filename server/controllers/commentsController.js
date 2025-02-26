const Comment = require("../models/commentModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.getAllCommentsForBlog = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.blogId)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    const comments = await Comment.aggregate([
      { $match: { blogId: new mongoose.Types.ObjectId(req.params.blogId) } },
      { $sort: { timestamp: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" },
      {
        $addFields: {
          authorName: "$authorInfo.fullName",
        },
      },
      {
        $project: {
          authorInfo: 0,
        },
      },
    ]);

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
});

exports.addComment = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    const author = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    if (!content || typeof content !== "string") {
      return res
        .status(400)
        .json({ message: "Content is required and must be a string" });
    }

    const newComment = new Comment({ blogId, author, content });
    await newComment.save();

    const commentWithAuthorName = await Comment.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(newComment._id) } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" },
      {
        $addFields: {
          authorName: "$authorInfo.fullName",
        },
      },
      {
        $project: {
          authorInfo: 0,
        },
      },
    ]);

    res.status(201).json(commentWithAuthorName[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add comment", error: error.message });
  }
});

exports.deleteComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(204).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: error.message });
  }
});
