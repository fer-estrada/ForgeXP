import { useEffect, useState } from "react";
import UserFavCard from "./UserFavCard";
import YouTubeCarousel from "./YouTubeCarousel"; // make sure it's imported
import SingleFavPost from "./SingleFavPost";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function Favorites({ user }) {
  const [favPosts, setFavPosts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchFavPosts() {
      const response = await fetch(`${address}/user/favorites`, { //update address here
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setFavPosts(result.posts);
    }
    fetchFavPosts();
  }, []);

  const youtubePosts =
    favPosts?.filter(
      (post) =>
        post.content?.includes("youtube.com") ||
        post.content?.includes("youtu.be")
    ) || [];

  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-10 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Favorite Posts
      </h2>

      {selectedPost ? (
        <SingleFavPost
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
        />
      ) : (
        <>
          {/* YouTube Carousel for YouTube Favorites */}
          {youtubePosts.length > 0 && (
            <YouTubeCarousel
              youtubePosts={youtubePosts}
              setSelectedPost={setSelectedPost}
            />
          )}

          {/* Grid of non-YouTube favorites */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            {favPosts
              ?.filter(
                (post) =>
                  !post.content?.includes("youtube.com") &&
                  !post.content?.includes("youtu.be")
              )
              .map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-[#111827]  rounded-xl p-6 cursor-pointer"
                >
                  <UserFavCard post={post} />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
