const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

exports.getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $sort: { date: -1 } },
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

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(blogId) } },
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
    console.log("Aggregation result:", blog);
    if (!blog || blog.length === 0) {
      res.status(404);
      throw new Error("Blog not found");
    }

    await Blog.updateOne(
      { _id: new mongoose.Types.ObjectId(blogId) },
      { $inc: { impressions: 1 } }
    );

    res.status(200).json(blog[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getMyBlogs = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  try {
    const blogs = await Blog.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(user_id) } },
      { $sort: { date: -1 } },
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

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.postBlog = asyncHandler(async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.content ||
      !req.body.imageUrl ||
      !req.body.summary
    ) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      summary: req.body.summary,
      imageUrl: req.body.imageUrl,
      minsRead: req.body.minsRead,
      author: req.user.id,
    });

    const blogWithAuthor = await Blog.aggregate([
      { $match: { _id: blog._id } },
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

    res.status(200).json(blogWithAuthor[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateBlog = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, summary, imageUrl } = req.body;

    if (!title || !content || !summary || !imageUrl) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }

    if (blog.author.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized to update this blog");
    }

    blog.title = title;
    blog.content = content;
    blog.summary = summary;
    blog.imageUrl = imageUrl;

    const updatedBlog = await blog.save();

    const updatedBlogWithAuthor = await Blog.aggregate([
      { $match: { _id: updatedBlog._id } },
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
    res.status(200).json(updatedBlogWithAuthor[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }

    if (blog.author.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized to delete this blog");
    }

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
