import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function UserPostCard({ post }) {
  let contentPath = post.content;

  function extractId(contentPath) {
    const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = contentPath.match(findId);
    return match ? match[1] : null;
  }

  function postContent(contentPath) {
    return (
      <video
        className="h-[180px] w-[320px] rounded-lg"
        controls
        src={`${address}${contentPath}`} //update address here
      ></video>
    );
  }

  return (
    <div>
      {/* Post Title */}
      <h3 className="text-xl font-semibold text-white drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] flex justify-center">
        {post.title}
      </h3>

      {/* Image or Uploaded Video */}
      {post.PostType === "image" && (
        <img
          className="h-[180px] w-[320px] rounded-lg object-cover"
          src={`${address}${contentPath}`} //update address here
          alt="Post content"
        />
      )}

      {post.PostType === "video" && <div>{postContent(contentPath)}</div>}

      {/* Likes Count */}
      <div className="mt-4 text-center text-gray-400 text-xs">
        Likes:{" "}
        <span className="text-white font-bold">
          {post.likes && Array.isArray(post.likes) ? post.likes.length : 0}
        </span>
      </div>
    </div>
  );
}
