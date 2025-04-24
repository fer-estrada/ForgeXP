import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommCard = ({ post, likeHandle, fetchHasLiked, setRefreshToggle, refreshToggle }) => {
  const [postLiked, setPostLiked] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  fetchHasLiked(post.id)
}, [refreshToggle])

async function likeHandle(postId) {
  const response = await fetch(`http://localhost:3000/post/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  setRefreshToggle(!refreshToggle)
}

  async function fetchHasLiked(postId) {
    const response = await fetch(`http://localhost:3000/post/hasliked/${postId}`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    const result = await response.json()
    return setPostLiked(result.boolean)
  }



  
  return (
    <div
      className="bg-[#13294b] border border-blue-500 rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:cursor-pointer hover:scale-[1.01] transition-transform"
      onClick={() => navigate(`/post/${post.id}`)}>
      <h3 className="text-xl font-semibold text-orange-400 mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)]">
        {post.title}
      </h3>

      <div className="text-gray-300 mb-4 break-words whitespace-pre-wrap">
        {post.description}
      </div>
      <div
        className="text-sm text-blue-300 mt-auto cursor-pointer hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          likeHandle(post.id);
        }}>
        {postLiked ? "liked" : "not liked"} | Likes:{" "}
        <span className="font-semibold text-white">{post.likes.length}</span>
      </div>
    </div>
  );
};

export default CommCard;
