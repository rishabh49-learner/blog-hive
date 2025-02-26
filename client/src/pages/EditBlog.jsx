import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlog, updateBlogPost } from "../features/blogs/blogsSlice";

const EditBlog = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, status, error } = useSelector((state) => state.blogs);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setContent(blog.content);
      setTitle(blog.title);
      setCoverImageUrl(blog.imageUrl);
      setSummary(blog.summary);
    }
  }, [blog]);

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);

    const imageUrl = URL.createObjectURL(file);
    setCoverImageUrl(imageUrl);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleDiscardImage = () => {
    setCoverImage(null);
    setCoverImageUrl(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const updatedBlog = {
      id,
      title,
      content,
      summary,
      imageUrl: coverImageUrl,
      coverImage,
    };
    await dispatch(updateBlogPost(updatedBlog));
    setIsSubmitting(false);
    setContent("");
    setTitle("");
    setSummary("");
    setCoverImage(null);
    setCoverImageUrl(null);
    navigate(`/blogs/${id}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen text-2xl text-center flex items-center justify-center">
        Error fetching blog: {error}
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-10">
        <div className="">
          <input
            type="text"
            id="title"
            placeholder="Type your blog title here..."
            value={title}
            className="w-full italic::placeholder"
            onChange={(e) => setTitle(e.target.value)}
            style={{
              fontSize: "2rem",
              outline: "none",
              border: "none",
              padding: "5px 0",
            }}
          />
        </div>

        <div className="flex items-center justify-center my-10 w-full relative">
          {coverImageUrl && (
            <div className="relative">
              <img
                src={coverImageUrl}
                alt="Cover"
                className="h-96 w-full object-cover rounded-lg"
              />
              <button
                onClick={handleDiscardImage}
                className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          {!coverImageUrl && (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PNG or JPG</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleCoverImageChange}
              />
            </label>
          )}
        </div>

        <div className="mt-3 mb-10">
          <textarea
            id="summary"
            placeholder="Type your blog summary here..."
            value={summary}
            onChange={handleSummaryChange}
            rows={4}
            className="w-full italic::placeholder border rounded"
            style={{
              fontSize: "1rem",
              padding: "10px",
              resize: "none",
              height: "120px",
            }}
          />
        </div>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={{
            height: "400px",
          }}
        />
      </div>
      <div className="text-center my-10">
        <button
          type="button"
          onClick={handleSubmit}
          className={`inline-flex items-center px-5 py-3 font-semibold leading-6 text-md shadow rounded-md text-white bg-blue-500 transition ease-in-out duration-150 ${
            isSubmitting
              ? "cursor-not-allowed hover:bg-blue-400"
              : "hover:bg-blue-600"
          }`}
        >
          {isSubmitting && (
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
          {isSubmitting ? "Making Changes..." : "Update"}
        </button>
      </div>
    </>
  );
};

export default EditBlog;
