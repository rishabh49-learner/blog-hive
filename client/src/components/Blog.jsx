import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import BlogPostOptions from "./BlogPostOptions";

const Blog = (props) => {
  const containerStyle = {
    backgroundImage: `url(${props.blog.imageUrl})`,
    backgroundPosition: "center center",
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",
  };
  const formattedDate = moment(props.blog.date).format("MMMM D, YYYY");

  return (
    <div className="container relative grid grid-cols-12 mx-auto border-b py-6">
      <div className="absolute right-3 top-9 hidden lg:block">
        <BlogPostOptions author={props.blog.author} blogId={props.blog._id} />
      </div>
      <div
        className="bg-no-repeat bg-cover col-span-full rounded-lg lg:col-span-4"
        style={containerStyle}
      ></div>
      <div className="flex flex-col px-4 py-6 col-span-full row-span-full lg:col-span-8 lg:p-10 justify-between">
        <div>
          <div className="flex items-start justify-between">
            <Link key={props.blog._id} to={`/blogs/${props.blog._id}`}>
              <h1 className="text-3xl font-semibold line-clamp-2">
                {props.blog.title}
              </h1>
            </Link>
            <div className="lg:hidden">
              <BlogPostOptions
                author={props.blog.author}
                blogId={props.blog._id}
              />
            </div>
          </div>
          <div className="">
            <span className="text-xs">{formattedDate}</span>
          </div>
          <p className="flex-1 pt-2 line-clamp-3">{props.blog.summary}</p>
          <div className="inline-flex items-center my-3  space-x-2 text-sm cursor-pointer">
            <Link key={props.blog._id} to={`/blogs/${props.blog._id}`}>
              <span>Read more</span>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-start pt-2">
          <div className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="self-center text-sm">
              by {props.blog.authorName}
            </span>
          </div>
          &nbsp; • &nbsp;
          <span className="text-xs">{props.blog.minsRead} min read</span>
          <span className="text-xs ml-auto">
            <i className="fa-regular fa-eye"></i> {props.blog.impressions}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
