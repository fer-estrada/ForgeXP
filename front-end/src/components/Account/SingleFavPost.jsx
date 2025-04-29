import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function SingleFavPost({ post, onBack }) {
    const contentPath = post.content;
  
    return (
      <div className="text-white max-w-3xl mx-auto p-6 bg-[#111827] rounded-xl shadow-lg">
        <button
          onClick={onBack}
          className="text-sm mb-4 text-blue-400 hover:underline"
        >
          ← Back to Favorites
        </button>
  
        <h2 className="text-2xl font-bold text-center mb-4">{post.title}</h2>
  
        {post.PostType === "image" && (
          <img
            src={`${address}${contentPath}`} //update address here
            alt="Post content"
            className="w-full rounded-lg mb-4"
          />
        )}
  
        {post.PostType === "video" && (
          <video
            src={`${address}${contentPath}`} //update address here
            controls
            className="w-full rounded-lg mb-4"
          />
        )}
  
        <p className="text-gray-300 text-sm whitespace-pre-wrap mb-4">
          {post.description || "No description."}
        </p>
  
        <p className="text-sm text-gray-400">
          Likes:{" "}
          <span className="text-white font-bold">
            {Array.isArray(post.likes) ? post.likes.length : 0}
          </span>
        </p>
  
        <p className="text-xs text-gray-500 mt-2">
          Posted: {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
    );
  }
  