import React from "react";
import service from "../Appwrite/conf";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, author }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="h-full rounded-md m-4 overflow-hidden flex flex-col justify-center align-center mx-auto hover:scale-105 transition-all cursor-pointer bg-slate-400 p-5 max-w-[300px]">
        <div className="w-full justify-center align-center mb-1 mx-auto">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full w-60 h-40 object-cover mx-auto"
          />
        </div>
        <div className="flex justify-start flex-col items-start">
          <h2 className="font-semibold font-mono mb-3">{title}</h2>
          <h2 className="text-xs text-gray-700 font-mono">
            Posted by:{" "}
            <span className="font-bold">{author ? author : "anonymous"}</span>{" "}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
