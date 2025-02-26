import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogsSlice";
import Loader from "../components/Loader";
import WriteBlogButton from "../components/WriteBlogButton";
import BlogCard from "../components/BlogCard";
import moment from "moment";

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(getAllBlogs());
    }
  }, [blogs.length, dispatch]);

  if (blogs.length === 0) {
    return <Loader />;
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.impressions - a.impressions);
  const featuredBlog = sortedBlogs.length > 0 ? sortedBlogs[0] : null;
  const trendingBlogs = sortedBlogs.length > 1 ? sortedBlogs.slice(1, 5) : [];

  const formattedDate = moment(featuredBlog.date).format("MMMM d, YYYY");

  return (
    <div className="min-h-screen">
      <section className="container p-6 mx-auto space-y-6 sm:space-y-12 my-6">
        <div className="mb-6 text-left">
          <h2 className="text-3xl font-bold">Featured Blog</h2>
        </div>
        {featuredBlog && (
          <Link key={featuredBlog._id} to={`/blogs/${featuredBlog._id}`}>
            <div className="block gap-3 mx-auto sm:max-w-full group lg:grid lg:grid-cols-12">
              <img
                src={featuredBlog.imageUrl}
                alt=""
                className="object-cover w-full h-64 rounded-lg sm:h-96 lg:col-span-7"
              />
              <div className="p-6 space-y-2 lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold sm:text-4xl">
                    {featuredBlog.title}
                  </h3>
                  <span className="text-xs">{formattedDate}</span>
                  <p className="my-3">{featuredBlog.summary}</p>
                </div>
                <div className="flex items-center justify-start pt-2">
                  <div className="flex space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="self-center text-sm">
                      by {featuredBlog.authorName}
                    </span>
                  </div>
                  &nbsp; • &nbsp;
                  <span className="text-xs">
                    {featuredBlog.minsRead} min read
                  </span>
                  <span className="text-xs ml-auto">
                    <i className="fa-regular fa-eye"></i>{" "}
                    {featuredBlog.impressions}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </section>
      <section className="py-6 sm:py-12">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold">Trending Blogs</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {trendingBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </section>
      <WriteBlogButton />
    </div>
  );
};

export default HomePage;
