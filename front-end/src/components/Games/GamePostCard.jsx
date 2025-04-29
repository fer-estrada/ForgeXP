
import { useState, useEffect } from "react";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

function GamePostCard({ post }) {
  const [postLiked, setPostLiked] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    fetchHasLiked(post.id);
  }, [refreshToggle]);

  async function likeHandle(postId) {
    const response = await fetch(`${address}/post/${postId}/like`, { //update address here
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRefreshToggle(!refreshToggle);
  }

  async function fetchHasLiked(postId) {
    const response = await fetch(`${address}/post/hasliked/${postId}`, { //update address here
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setPostLiked(result.boolean);
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] w-full h-72 flex flex-col justify-between overflow-hidden">
      {/* Post Title */}
      <h1 className="text-lg font-bold mb-2 text-blue-700 truncate">
        {post.title}
      </h1>

      {/* Post Content */}
      <div className="mb-2 text-gray-300 text-sm line-clamp-3">
        {post.content}
      </div>

      {/* Post Description */}
      <div className="text-gray-400 italic text-xs mb-2 truncate">
        {post.description}
      </div>

      {/* Metadata Row */}
      <div className="flex justify-between items-center text-[10px] text-gray-500">
        <div>By: {post.userId}</div>
        <div>{new Date(post.createdAt).toLocaleDateString()}</div>
      </div>

      {/* Like Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => likeHandle(post.id)}
          className={`px-3 py-1 rounded-md text-xs font-semibold transition 
            ${
              postLiked
                ? "bg-orange-500 hover:bg-orange-400"
                : "bg-gray-600 hover:bg-gray-500 border border-orange-500"
            }`}
        >
          {postLiked ? " Liked" : "🤍 Like"}
        </button>
      </div>
    </div>
  );
}

export default GamePostCard;
