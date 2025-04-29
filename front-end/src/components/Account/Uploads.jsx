import { useEffect, useState } from "react";
import UserPostCard from "./UserPostCard";
import SinglePost from "../Account/MySinglePost";
import YouTubeCarousel from "./YouTubeCarousel";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function Uploads({ user }) {
  const [userPosts, setUserPosts] = useState([]);
  const [youtubePosts, setYoutubePosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (user?.posts) {
      const regularPosts = user.posts.filter((post) => {
        const isYouTubeLink =
          post.content?.startsWith("http://") ||
          post.content?.startsWith("https://");
        return !isYouTubeLink;
      });

      const ytPosts = user.posts.filter((post) => {
        const isYouTubeLink =
          post.content?.startsWith("http://") ||
          post.content?.startsWith("https://");
        return isYouTubeLink;
      });

      setUserPosts(regularPosts);
      setYoutubePosts(ytPosts);
    }
  }, [user]);
  console.log("USER POST", user.posts);

  return (
    <div className="text-white px-6 py-10 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Uploaded Posts
        </h2>
      </div>

      {/* Always show YouTube carousel first if any */}
      {!selectedPost && youtubePosts.length > 0 && (
        <>
          
          <YouTubeCarousel
            youtubePosts={youtubePosts}
            setSelectedPost={setSelectedPost}
          />
        </>
      )}

      {/* Either show SinglePost or Grid */}
      {selectedPost ? (
        <SinglePost post={selectedPost} goBack={() => setSelectedPost(null)} />
      ) : (
        <>
          {/* Normal Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="cursor-pointer bg-[#111827] rounded-xl p-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] border border-transparent hover:scale-105 transition-transform duration-300"
                >
                  <UserPostCard post={post} />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-300">No uploads yet.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

