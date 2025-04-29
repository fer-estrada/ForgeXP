import { useEffect, useState } from "react";
import { address } from "../../../address"; //update address here
console.log('address =>', address); 

const CommunityCard = ({ post, setRefreshToggle, refreshToggle }) => {
  const [postLiked, setPostLiked] = useState(false);
  const [postFav, setPostFav] = useState(false);
  const [favToggle, setFavToggle] = useState(false);

  useEffect(() => {
    fetchHasLiked(post.id);
  }, [refreshToggle]);

  useEffect(() => {
    fetchHasFav(post.id);
  }, [favToggle]);

  async function likeHandle(postId) {
    await fetch(`${address}/post/${postId}/like`, { //add slash
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setRefreshToggle(!refreshToggle);
  }

  async function fetchHasLiked(postId) {
    const response = await fetch(`${address}post/hasliked/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setPostLiked(result.boolean);
  }

  async function fetchHasFav(postId) {
    const response = await fetch(`${address}user/hasfav/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setPostFav(result.boolean);
  }

  async function favHandle(postId) {
    const response = await fetch(`${address}user/favorite/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setFavToggle(!favToggle);
  }

  let favClass = "p-4 bg-red-700";
  if (postFav) {
    favClass = "p-4 bg-green-700";
  } else {
    favClass = "p-4 bg-red-700";
  }

  let contentPath = post.content;

  function extractId(contentPath) {
    const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = contentPath.match(findId);
    return match ? match[1] : null;
  }

  function postContent(contentPath) {
    if (
      contentPath.startsWith("http://") ||
      contentPath.startsWith("https://")
    ) {
      const videoId = extractId(contentPath);
      return (
        <div>
          <iframe
            className="h-[180px] w-[320px]"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          ></iframe>
          <a
            href={contentPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            {contentPath}
          </a>
        </div>
      );
    }

    return (
      <video
        className="h-[180px] w-[320px]"
        controls
        src={`http://localhost:3000${contentPath}`}
      ></video>
    );
  }

  return (
    <div className="bg-gray-900   rounded-2xl shadow-lg p-5 flex flex-col justify-between drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
      {/* Post Title */}
      <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] flex justify-center">
        {post.title}
      </h3>

      {/* Post Description */}
      <div className="text-gray-300 mb-4 break-words whitespace-pre-wrap text-sm">
        {post.description}
      </div>

      {post.PostType === "image" && (
        <div>
          <img
            className="h-[180px] w-[320px]"
            src={`http://localhost:3000${contentPath}`}
            alt=""
          />
        </div>
      )}

      {post.PostType === "video" && <div>{postContent(contentPath)}</div>}

      {/* Like Button */}
      <div className="mt-4 flex justify-between items-center">
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

        <span className="text-gray-400 text-xs">
          Likes:{" "}
          <span className="text-white font-bold">{post.likes.length}</span>
        </span>
      </div>

      {/* Save Button */}
      <div
        onClick={() => favHandle(post.id)}
        className={`mt-4 text-center text-xs font-semibold cursor-pointer rounded-md transition p-3 w-32 mx-auto
    ${
      postFav
        ? "bg-orange-500 hover:bg-orange-400 border border-blue-700"
        : " border border-blue-700 shadow-[0_0_20px_#22d3ee60] hover:shadow-blue-700 duration-300"
    }`}
      >
        {postFav ? "Favorited" : "Add to Favorites"}
      </div>
    </div>
  );
};

export default CommunityCard;
