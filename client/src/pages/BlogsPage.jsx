import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogsSlice";
import Blog from "../components/Blog";
import Loader from "../components/Loader";
import WriteBlogButton from "../components/WriteBlogButton";
import { useEffect } from "react";

const BlogsPage = () => {
  const dispatch = useDispatch();
  const { blogs, status } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (status === "idle" || blogs.length === 0) {
      dispatch(getAllBlogs());
    }
  }, [status, blogs.length, dispatch]);

  if (status === "loading" && !blogs) {
    return <Loader />;
  }

  if (status === "failed") {
    return <div>Error loading blogs. Please try again.</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 grid grid-cols-1">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => <Blog blog={blog} key={blog._id} />)
        ) : (
          <div>No blogs found.</div>
        )}
        <WriteBlogButton />
      </div>
    </div>
  );
};

export default BlogsPage;
