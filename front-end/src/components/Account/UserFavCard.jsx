import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function UserFavCard({ post }) {
  const contentPath = post.content;

  return (
    <div className="flex flex-col justify-between h-full text-white">
      {/* Top section: title + media */}
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-xl font-semibold text-white drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] text-center">
          {post.title}
        </h3>

        {post.PostType === "image" && (
          <img
            className="h-[180px] w-[320px] rounded-lg object-cover mx-auto"
            src={`${address}${contentPath}`} //update address here
            alt="Post content"
          />
        )}

        {post.PostType === "video" && (
          <video
            className="h-[180px] w-[320px] rounded-lg mx-auto"
            controls
            src={`${address}${contentPath}`} //update address here
          />
        )}
      </div>

      {/* Bottom section: Likes */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Likes:{" "}
        <span className="text-white font-bold">
          {Array.isArray(post.likes) ? post.likes.length : 0}
        </span>
      </div>
    </div>
  );
}
