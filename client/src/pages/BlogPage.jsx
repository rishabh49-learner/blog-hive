import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import Comment from "../components/Comment";
import Loader from "../components/Loader";
import moment from "moment";
import {
  getSingleBlog,
  getBlogComments,
  addCommentInBlog,
} from "../features/blogs/blogsSlice";

const BlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const {
    blog,
    comments,
    status: blogStatus,
  } = useSelector((state) => state.blogs);
  const [commentContent, setCommentContent] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const formattedDate = moment(blog?.date).format("MMMM D, YYYY");

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (blog) {
      dispatch(getBlogComments(blog._id));
    }
  }, [dispatch, blog]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setIsCommenting(true);
    await dispatch(addCommentInBlog({ blogId: id, content: commentContent }));
    setIsCommenting(false);
    setCommentContent("");
  };

  if (blogStatus === "loading" && !blog) {
    return <Loader />;
  }

  if (!blog) {
    return <div>Error loading blog. Please try again.</div>;
  }

  const { title, content, imageUrl } = blog;
  const sanitizedContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-lg mx-auto container px-6">
        <main className="mt-10">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0">
              <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                {title}
              </h2>
              <div className="flex items-center my-3">
                <div className="flex flex-col">
                  <span className="text-md">by {blog.authorName}</span>
                  <span className="text-xs">
                    {" "}
                    {formattedDate}&nbsp; • &nbsp;{blog.minsRead} min read
                  </span>
                </div>
              </div>
            </div>
            <img
              src={imageUrl}
              className="w-full object-cover rounded-md"
              alt="blog cover"
              style={{ height: "28em" }}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full">
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
          </div>
        </main>
        <div className="mt-10">
          <div className="w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                Comments ({comments.length})
              </h2>
            </div>
            <form onSubmit={handleAddComment} className="mb-6 relative">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="6"
                  style={{ height: "150px", resize: "none" }}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                  placeholder="Write a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className={`inline-flex items-center px-5 py-3 font-semibold leading-6 text-md shadow rounded-md text-white bg-green-600 transition ease-in-out duration-150 ${
                    isCommenting
                      ? "cursor-not-allowed hover:bg-green-700"
                      : "hover:bg-green-600"
                  }`}
                  disabled={isCommenting || !isLoggedIn}
                >
                  {isCommenting && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {isCommenting ? "Posting..." : "Post Comment"}
                </button>
              </div>
              {!isLoggedIn && (
                <div className="absolute scale-[1.1] h-full w-full top-0 backdrop-blur-sm rounded-lg text-3xl flex items-center justify-center font-bold">
                  Login to comment
                </div>
              )}
            </form>
          </div>
          {comments?.map((comment) => (
            <Comment
              key={comment._id}
              authorName={comment.authorName}
              date={comment.createdAt}
              content={comment.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
