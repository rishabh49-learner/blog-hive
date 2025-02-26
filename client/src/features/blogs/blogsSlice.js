import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  fetchSingleBlog,
  fetchComments,
  updateBlog,
  fetchMyBlogs,
  postComment,
  deleteBlog,
  uploadImage,
  postBlog,
} from "./blogsAPI";

const initialState = {
  blogs: [],
  blog: null,
  comments: [],
  myBlogs: [],
  status: "idle",
  error: null,
};

export const getAllBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await fetchBlogs();
  return response.data;
});

export const getSingleBlog = createAsyncThunk(
  "blogs/fetchSingleBlog",
  async (blogId) => {
    const response = await fetchSingleBlog(blogId);
    return response.data;
  }
);

export const removeBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId) => {
    await deleteBlog(blogId);
    return blogId;
  }
);

export const getBlogComments = createAsyncThunk(
  "blogs/fetchComments",
  async (blogId) => {
    const response = await fetchComments(blogId);
    return response.data;
  }
);

export const addCommentInBlog = createAsyncThunk(
  "blogs/postComment",
  async ({ blogId, content }) => {
    const response = await postComment({ blogId, content });
    return response.data;
  }
);

export const updateBlogPost = createAsyncThunk(
  "blogs/updateBlogPost",
  async ({ id, title, content, summary, coverImage, imageUrl }) => {
    if (coverImage) {
      imageUrl = await uploadImage(coverImage);
    }

    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minsRead = Math.ceil(wordCount / wordsPerMinute);

    const blogData = {
      title,
      content,
      summary,
      imageUrl,
      minsRead,
    };

    const response = await updateBlog(id, blogData);
    return response.data;
  }
);

export const createBlogPost = createAsyncThunk(
  "blogs/createBlogPost",
  async ({ title, content, summary, coverImage }) => {
    let imageUrl = null;
    if (coverImage) {
      imageUrl = await uploadImage(coverImage);
    }

    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minsRead = Math.ceil(wordCount / wordsPerMinute);

    const blogData = {
      title,
      content,
      summary,
      imageUrl,
      minsRead,
    };

    const response = await postBlog(blogData);
    return response.data;
  }
);

export const getMyBlogs = createAsyncThunk("blogs/fetchMyBlogs", async () => {
  const response = await fetchMyBlogs();
  return response.data;
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.status = "succeeded";
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.status = "succeeded";
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBlogComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = "succeeded";
      })
      .addCase(getBlogComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        const updatedBlog = action.payload;

        state.blog = updatedBlog;

        const blogIndex = state.blogs.findIndex(
          (blog) => blog._id === updatedBlog._id
        );
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = updatedBlog;
        }

        const myBlogIndex = state.myBlogs.findIndex(
          (blog) => blog._id === updatedBlog._id
        );
        if (myBlogIndex !== -1) {
          state.myBlogs[myBlogIndex] = updatedBlog;
        }

        state.status = "succeeded";
      })

      .addCase(updateBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyBlogs.fulfilled, (state, action) => {
        state.myBlogs = action.payload;
        state.status = "succeeded";
      })
      .addCase(getMyBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCommentInBlog.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
        state.status = "succeeded";
      })
      .addCase(addCommentInBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCommentInBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        state.myBlogs = state.myBlogs.filter(
          (blog) => blog._id !== action.payload
        );
        state.status = "succeeded";
      })
      .addCase(removeBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
        state.myBlogs.unshift(action.payload);
        console.log("New blog added to state:", action.payload);
        state.status = "succeeded";
      })
      .addCase(createBlogPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogsSlice.reducer;
