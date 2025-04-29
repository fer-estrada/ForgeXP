import { Trash } from "lucide-react";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function SinglePost({ post, goBack }) {
  let contentPath = post.content;

  function extractId(contentPath) {
    const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = contentPath.match(findId);
    return match ? match[1] : null;
  }
  // delete post function
  function handleDelete(postId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    fetch(`${address}/user/post/${postId}`, { //update address here
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log("Delete response status:", response.status);
        if (response.ok) {
          setUserPosts(userPosts.filter((post) => post.id !== postId));
          alert("Post deleted successfully.");
        } else {
          alert("Failed to delete post. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        alert("Something went wrong.");
      });
  }

  function postContent(contentPath) {
    if (
      contentPath.startsWith("http://") ||
      contentPath.startsWith("https://")
    ) {
      const videoId = extractId(contentPath);
      return (
        <iframe
          className="w-full h-[400px] rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <video
        className="w-full h-[400px] rounded-lg"
        controls
        src={`${address}${contentPath}`} //update address here
      ></video>
    );
  }

  return (
    <div className="bg-[#111827] p-6 rounded-xl shadow-lg flex flex-col items-center border">
      <button
        onClick={goBack}
        className="self-start mb-6 px-4 py-2 border border-blue-700 rounded-md text-sm font-semibold hover:shadow-[0_0_10px_2px_rgba(29,78,216,0.7)] transition-shadow duration-300"
      >
        ← All Uploaded Posts
      </button>

      <h2 className="text-3xl font-bold text-white mb-6">{post.title}</h2>

      <p className="text-gray-300 mb-6 text-center">{post.description}</p>

      {/* Media */}
      {post.PostType === "image" && (
        <img
          className="rounded-lg object-cover max-h-[400px] w-full"
          src={`${address}${contentPath}`} //update address here
          alt="Post content"
        />
      )}

      {post.PostType === "video" && (
        <div className="w-full flex justify-center">
          {postContent(contentPath)}
        </div>
      )}

      <div>
        <button
          onClick={() => handleDelete(post.id)}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
          title="Delete Post"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}
