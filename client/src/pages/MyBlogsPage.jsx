import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogs } from "../features/blogs/blogsSlice";
import Blog from "../components/Blog";
import Loader from "../components/Loader";

const MyBlogsPage = () => {
  const dispatch = useDispatch();
  const { myBlogs, status, error } = useSelector((state) => state.blogs);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getMyBlogs());
    }
  }, [dispatch, isLoggedIn]);

  if (status === "loading" && !myBlogs) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen text-4xl text-center flex items-center justify-center">
        Login to view your blogs
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen text-2xl text-center flex items-center justify-center">
        Error fetching blogs: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {myBlogs && myBlogs.length > 0 ? (
        <div className="container mx-auto p-6 grid grid-cols-1">
          <h1 className="text-3xl font-bold">My Blogs</h1>
          {myBlogs.map((myBlog) => (
            <Blog blog={myBlog} key={myBlog._id} />
          ))}
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center text-2xl">
          No blogs
        </div>
      )}
    </div>
  );
};

export default MyBlogsPage;
