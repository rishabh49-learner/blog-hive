import React, { useState } from "react";
import { Link } from "react-router-dom";
import { removeBlog } from "../features/blogs/blogsSlice";
import { useDispatch, useSelector } from "react-redux";

const BlogPostOptions = ({ author, blogId }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleDelete = async (blogId) => {
    if (!isLoggedIn) {
      console.error("User not logged in. Cannot delete blog.");
      return;
    }

    try {
      await dispatch(removeBlog(blogId));
      console.log("Blog deleted successfully");
    } catch (error) {
      console.error("Failed to delete the blog:", error);
    }
  };

  const handleCopyLink = () => {
    const blogLink = `${window.location.origin}/blogs/${blogId}`;
    navigator.clipboard
      .writeText(blogLink)
      .then(() => console.log("Blog link copied to clipboard!"))
      .catch((error) => console.error("Failed to copy blog link:", error));
  };

  return (
    <div className="relative">
      <div
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
        className="h-10 w-10 text-md flex items-center justify-center text-white font-bold rounded-full cursor-pointer bg-gray-500"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>

      {isDropdownVisible && (
        <div
          id="userDropdown"
          className="z-10 absolute right-0 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="avatarButton"
          >
            <li
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleCopyLink}
            >
              <i className="fa-solid fa-link"></i> &nbsp; Copy Blog Link
            </li>
            {user?.id === author && (
              <>
                <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={`/edit-blog/${blogId}`}>
                    <i className="fa-solid fa-pencil"></i> &nbsp; Edit
                  </Link>
                </li>
                <li
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDelete(blogId)}
                >
                  <i className="fa-solid fa-trash"></i> &nbsp; Delete
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogPostOptions;
