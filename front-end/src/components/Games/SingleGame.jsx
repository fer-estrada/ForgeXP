import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GamePostCard from "./GamePostCard";
import EditGameCoverModal from "./EditGameCoverModal";
import EditGameDescriptionModal from "./EditGameDescriptionModal";
import { Check } from "lucide-react";
import { address } from "../../../address";

export default function SingleGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [posts, setPosts] = useState(null);
  const [userComm, setUserComms] = useState(null);
  const [isUserSubbed, setIsUserSubbed] = useState(null);
  const [clickCheck, setClickCheck] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditCover, setShowEditCover] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const navigate = useNavigate();
  const formData = new FormData();

  function coverHandle() {
    setShowEditCover(true);
  }

  async function saveCover(coverImage) {
    formData.append("newCover", coverImage);
    await fetch(`${address}/games/update/${game.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    window.location.reload();
  }

  async function descHandle() {
    setShowEditDescription(true);
  }

  async function saveDesc(desc) {
    const response = await fetch(`${address}/games/update/${game.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ description: desc }),
    });
    const result = await response.json();
    window.location.reload();
  }

  async function deleteHandle() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (confirmed) {
      await fetch(`${address}/games/delete/${game.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Game deletion confirmed.");
      navigate("/all-games");
    }
  }

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(`${address}/games/${id}`);
      const result = await response.json();
      setGame(result.game);
    }
    async function fetchPost() {
      const response = await fetch(`${address}/post/game/${id}`);
      const result = await response.json();
      setPosts(result.posts);
    }
    async function fetchUser() {
      const response = await fetch(`${address}/user/info`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setUserComms(result.user.communities);
      setIsAdmin(result.user.isAdmin);
    }
    fetchGame();
    fetchPost();
    fetchUser();
  }, [clickCheck]);

  useEffect(() => {
    if (userComm && game) {
      const subCheck = userComm.some((com) => com.id === game.id);
      setIsUserSubbed(subCheck);
    }
  }, [userComm, game]);

  async function subHandle() {
    const response = await fetch(`${address}/user/join-game/${game.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setClickCheck(!clickCheck);
  }

  if (!game) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        Game not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-5xl mx-auto">
      <div
        className="rounded-lg p-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] relative overflow-hidden"
        style={{
          backgroundImage: `url(http://localhost:3000${game.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:3000${game.coverImage}`}
              alt="Game Cover"
              className="w-48 h-64 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Game Info + Buttons */}
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-4xl font-bold">{game.gameName}</h2>

            <div className="flex flex-wrap gap-4">
              {/* Subscribe Button */}
              <button
                onClick={subHandle}
                className={`px-6 py-2 rounded-lg font-semibold transition
    ${
      isUserSubbed
        ? "bg-gray-800 border border-blue-700 hover:border-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        : "bg-gray-800 border border-blue-700"
    }`}
              >
                {isUserSubbed ? (
                  <span className="flex items-center gap-2">
                    Subscribed <Check size={16} className="text-green-400" />
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>

              {/* Create Post Button */}
              <button
                onClick={() => navigate(`/createpost/${game.id}`)}
                className="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Create Post
              </button>
            </div>

            {/* Admin Buttons */}
            {isAdmin && (
              <div className="flex flex-wrap gap-2 mt-6">
                <button
                  onClick={coverHandle}
                  className="px-4 py-2 border bg-gray-800 border-blue-700 rounded-lg"
                >
                  Edit Cover
                </button>
                <button
                  onClick={descHandle}
                  className="px-4 py-2 border bg-gray-800 border-blue-700 rounded-lg"
                >
                  Edit Description
                </button>
                <button
                  onClick={deleteHandle}
                  className="px-4 py-2 border bg-gray-800 border-red-700 rounded-lg text-red-500 font-bold"
                >
                  Delete Game
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Game Description */}
        <div className="mt-8 bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10 shadow-inner shadow-black/40">
          <h3 className="text-2xl font-semibold mb-2 text-white drop-shadow">
            About This Game
          </h3>
          <p className="text-gray-200 leading-relaxed">{game.description}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts ? (
          posts.map((post) => (
            <GamePostCard key={post.id} post={post} gameId={post.communityId} />
          ))
        ) : (
          <p className="text-center text-lg mt-6">Loading posts...</p>
        )}
      </div>

      {showEditCover && (
        <EditGameCoverModal
          isOpen={showEditCover}
          onClose={() => setShowEditCover(false)}
          onSave={(file) => {
            saveCover(file);
            setShowEditCover(false);
          }}
        />
      )}

      {showEditDescription && (
        <EditGameDescriptionModal
          game={game}
          isOpen={showEditDescription}
          currentDescription={game.description}
          onClose={() => setShowEditDescription(false)}
          onSave={(newDesc) => {
            saveDesc(newDesc);
            setShowEditDescription(false);
          }}
        />
      )}
    </div>
  );
}
