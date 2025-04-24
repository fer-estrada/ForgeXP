import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/single/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return <div className="text-white text-center mt-10">Loading post...</div>;

  const renderContent = () => {
    if (post.postType === "image") {
      return (
        <img
          src={post.content}
          alt="Post"
          className="w-full rounded-lg shadow-md max-h-[500px] object-contain"
        />
      );
    } else if (post.postType === "video") {
      return (
        <div className="aspect-video">
          <iframe
            src={post.content}
            title="Video Post"
            allow="fullscreen"
            className="w-full h-full rounded-lg shadow-md"
          />
        </div>
      );
    } else {
      return <p className="text-gray-300 break-words">{post.content}</p>;
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 text-white bg-[#0f172a]">
      <div className="max-w-4xl mx-auto bg-[#13294b] p-8 rounded-2xl shadow-lg border border-blue-500">
        <h1 className="text-3xl font-bold text-orange-400 mb-2 drop-shadow-[0_0_6px_rgba(255,165,0,0.4)]">
          {post.title}
        </h1>
        <p className="text-gray-400 mb-6 text-sm">Posted on {new Date(post.createdAt).toLocaleString()}</p>

        <div className="mb-6">{renderContent()}</div>

        <p className="text-gray-200 whitespace-pre-wrap">{post.description}</p>

        <div className="mt-6 text-sm text-blue-300">
          <span className="font-semibold text-white">{post.likes.length}</span> Likes
        </div>
      </div>
    </div>
  );
};

export default SinglePost;