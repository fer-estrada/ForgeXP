// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import GamePostCard from "./GamePostCard";

// export default function SingleGame() {
//   const { id } = useParams();
//   const [game, setGame] = useState(null)
//   const [posts, setPost] = useState(null)
//   console.log('posts useState => ', posts)

//   useEffect(() => {
//     const address = 'http://localhost:3000/'
//     async function fetchGame() {
//       const response = await fetch(`${address}games/${id}`)
//       const result = await response.json()
//       setGame(result.game)
//     }
//     async function fetchPost() {
//       const response = await fetch(`${address}post/game/${id}`)
//       const result = await response.json()
//       setPost(result.posts)
//     }
//     fetchGame()
//     fetchPost()
//   },[])

//   if (!game) {
//     return (
//       <div className="text-center mt-20 text-white text-xl">
//         Game not found.
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto">
//       <div className="bg-gray-900 rounded-lg p-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
//         <h2 className="text-3xl font-bold mb-4">{game.gameName}</h2>
//         <div>
//           <img src={`http://localhost:3000${game.coverImage}`} alt="" />
//         </div>
//         <div>
//           {game.description}
//         </div>
//       </div>
//         {posts ?
//         posts.map((post) => (
//           <div key={post.id}>
//             <GamePostCard post={post}/>
//           </div>
//         ))
//         : "loading . . ."
//       }
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GamePostCard from "./GamePostCard";

export default function SingleGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [posts, setPosts] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const address = "http://localhost:3000/";
    async function fetchGame() {
      const response = await fetch(`${address}games/${id}`);
      const result = await response.json();
      setGame(result.game);
    }
    async function fetchPost() {
      const response = await fetch(`${address}post/game/${id}`);
      const result = await response.json();
      setPosts(result.posts);
    }
    fetchGame();
    fetchPost();
  }, [id]);

  if (!game) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        Game not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-5xl mx-auto">
      <div className="bg-gray-900 rounded-lg p-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:3000${game.coverImage}`}
              alt="Game Cover"
              className="w-48 h-64 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </div>

          {/* Game Info + Buttons */}
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-4xl font-bold">{game.gameName}</h2>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setFavorited(!favorited)}
                className={`px-4 py-2 rounded-lg font-semibold transition 
      ${
        favorited
          ? "bg-blue-700 hover:bg-blue-700 border border-orange-500"
          : "bg-blue-700 hover:bg-blue-700"
      }`}
              >
                {favorited ? "🧡 Favorited" : "⭐ Favorite"}
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`px-4 py-2 rounded-lg font-semibold transition 
      ${
        liked
          ? "bg-orange-500 hover:bg-orange-400"
          : "bg-orange-500 hover:bg-orange-400 border border-blue-700"
      }`}
              >
                {liked ? "Liked" : "Like"}
              </button>
              <button className="px-4 py-2  rounded-lg font-semibold border border-orange-500  hover:border-blue-700">
                Create Post
              </button>
              <button className="px-4 py-2 rounded-lg font-semibold border border-orange-500 hover:border-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Game Description */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2">About This Game</h3>
          <p className="text-gray-300">{game.description}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-10">
        {posts ? (
          posts.map((post) => (
            <div key={post.id} className="mb-6">
              <GamePostCard post={post} />
            </div>
          ))
        ) : (
          <p className="text-center text-lg mt-6">Loading posts...</p>
        )}
      </div>
    </div>
  );
}
