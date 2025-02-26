import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const BlogCard = (props) => {
  const formattedDate = props.blog.date
    ? moment(props.blog.date).format("MMMM d, YYYY")
    : "";

  return (
    <Link key={props.blog._id} to={`/blogs/${props.blog._id}`}>
      <article className="flex flex-col">
        <div>
          <img
            alt=""
            className="object-cover rounded-md w-full h-52 "
            src={props.blog.imageUrl}
          />
        </div>
        <div className="flex flex-col flex-1 py-6">
          <div className="flex justify-between items-center">
            <span className="text-xs">{formattedDate}</span>
            <span className="text-xs">
              <i className="fa-regular fa-eye"></i> {props.blog.impressions}
            </span>
          </div>
          <h3 className="flex-1 my-2 text-lg font-semibold line-clamp-1 overflow-hidden">
            {props.blog.title}
          </h3>

          <div className="flex items-center justify-between pt-2">
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
              <span className="self-center text-xs">
                by {props.blog.authorName}
              </span>
            </div>
            <span className="text-xs">{props.blog.minsRead} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
