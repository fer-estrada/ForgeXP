import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SingleUserDetails from "./SingleUserDetails";
import SingleUserUploads from "./SingleUserUploads";
import ReturnButton from "../ReturnButton";
import { toggleFollow } from "../../API/index";
import SingleUserAdmin from "../Admin/SingleUserAdmin";
import { address } from "../../../address"; //update address here
console.log('address =>', address); 

export default function SingleUser() {
  const [activeTab, setActiveTab] = useState("details");
  const [user, setUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [userPosts, setUserPosts] = useState(null);

  const [showOptions, setShowOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); //This isnt being used any more since moving the 3 dot button to Followers pop up. (Leaving here to use for something else)

  const tabComponents = {
    // details: <SingleUserDetails />,
    uploads: <SingleUserUploads userPosts={userPosts} />,
    details: <SingleUserDetails user={user} />,
    // uploads: <SingleUserUploads />,
  };

  useEffect(() => {
    async function fetchSelf() {
      const response = await fetch(`${address}/user/info`, { //update address here
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setIsAdmin(result.user.isAdmin)
      setCurrentUserId(result.user.id);
    }
    fetchSelf();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${address}/user/${id}`); //update address here
      const data = await response.json();
      setUser(data.user);
    }
    fetchUser();
    checkIfFollowing();
    fetchFollowCounts();
  }, [id]);

  useEffect(() => {
    if (user) {
      setUserPosts(user.posts);
    }
  }, [user]);

  //For displaying a count number **WHAT I HAD TO ADD TO THE BACKEND FOR
  const fetchFollowCounts = async () => {
    try {
      const res = await fetch(`${address}/user/follow/counts/${id}`); //update address here
      const data = await res.json();
      setFollowCounts({
        followers: data.followers,
        following: data.following,
      });
    } catch (err) {
      console.error("Failed to fetch follow counts", err);
    }
  };

  //For viewing Followers pop up
  const [followerList, setFollowerList] = useState([]);
  const openFollowersModal = async () => {
    setShowFollowers(true);
    try {
      const res = await fetch(`${address}/user/followed/${id}`); //update address here
      const data = await res.json();
      setFollowerList(data.followers);
    } catch (err) {
      console.error("Error loading followers", err);
    }
  };

  //For viewing Following Pop up
  const [followingList, setFollowingList] = useState([]);
  const openFollowingModal = async () => {
    setShowFollowing(true);
    try {
      const res = await fetch(`${address}/user/following/${id}`);  //update address here
      const data = await res.json();
      setFollowingList(data.following);
    } catch (err) {
      console.error("Error loading following list", err);
    }
  };

  async function checkIfFollowing() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${address}/user/isfollowing/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setIsFollowing(data.isFollowing);
    } catch (err) {
      console.error("Error checking follow status", err);
    }
  }

  const handleFollowToggle = async () => {
    const token = localStorage.getItem("token");
    const result = await toggleFollow(user.id, token);
    if (result) {
      setIsFollowing(result.isFollowed);
      fetchFollowCounts(); // updates the numbers
    }
  };

  const handleUserClick = (userId) => {
    setShowFollowers(false);
    setShowFollowing(false);

    setTimeout(() => {
      if (currentUserId === userId) {
        navigate("/account");
      } else {
        navigate(`/user/${userId}`);
      }
    }, 100);
  };

  if (!user) return <div className="text-white p-4">Loading user...</div>;

  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto">
      <div>
        <SingleUserAdmin user={user} isAdmin={isAdmin} />
      </div>
      {/* Avatar and Username */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={
              newAvatar
                ? URL.createObjectURL(newAvatar)
                : `${address}${user.avatar}` //update addrees here
            }
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover shadow-lg"
          />
        </div>

        <h2 className="text-xl mt-4 font-bold">@{user.username}</h2>
        <div className="flex gap-6 mt-2 mb-6 text-center justify-center">
          <button
            onClick={openFollowersModal}
            className="hover:text-orange-400 transition flex flex-col"
          >
            <span className="text-lg font-bold cursor-pointer">
              {followCounts.followers}
            </span>
            <span className="text-sm cursor-pointer">Followers</span>
          </button>
          <button
            onClick={openFollowingModal}
            className="hover:text-orange-400 transition flex flex-col"
          >
            <span className="text-lg font-bold cursor-pointer">
              {followCounts.following}
            </span>
            <span className="text-sm cursor-pointer">Following</span>
          </button>
        </div>
        {/* Follow / Following Button */}
        <div className="relative mt-2">
          {!isFollowing ? (
            <button
              onClick={handleFollowToggle}
              className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
            >
              Follow
            </button>
          ) : (
            <div className="relative inline-block">
              <button
                onClick={() => setShowOptions((prev) => !prev)}
                className="bg-gray-800 border border-orange-400 text-white px-4 py-1 rounded hover:bg-orange-500 transition"
              >
                Following ⌄
              </button>
              {showOptions && (
                <div className="absolute mt-1 w-32 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                  <div
                    onClick={handleFollowToggle}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-500 cursor-pointer"
                  >
                    Unfollow
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Avatar */}
      {showEditAvatar && (
        <div className="bg-gray-800 border border-orange-400 rounded-lg p-6 mb-6 text-center">
          <h3 className="text-lg mb-4 font-semibold text-orange-400">
            Change Profile Picture
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewAvatar(e.target.files[0])}
            className="text-white text-sm mb-4"
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setShowEditAvatar(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowEditAvatar(false);
              }}
              className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded"
            >
              Save New Avatar
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-gray-900 rounded-lg p-4 mb-7 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        <div className="flex justify-center gap-6 border-b border-gray-700 pb-2 mb-4">
          {["details", "uploads"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`hover:text-orange-400 ${
                activeTab === tab && "text-orange-500 font-semibold"
              }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-md p-4 min-h-[200px] border border-blue-600">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {tabComponents[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Return button */}
      <div className="flex justify-center mt-10">
        <ReturnButton />
      </div>
      {showFollowers && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-cover bg-center bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
              style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
            >
              <div className="relative mb-4">
                <h3 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  Followers
                </h3>
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-white"
                  onClick={() => setShowFollowers(false)}
                >
                  ✕
                </button>
              </div>

              {followerList.length > 0 ? (
                <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {followerList.map((follower) => (
                    <li
                      key={follower.id}
                      onClick={() => handleUserClick(follower.id)}
                      className="cursor-pointer flex items-center gap-3 p-2 border-b border-blue-400 hover:border-orange-400"
                    >
                      <img
                        src={`http://localhost:3000${follower.avatar}`}
                        alt={follower.username}
                        className="w-8 h-8 rounded-full object-cover border border-gray-500"
                      />
                      <span>{follower.username}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300 text-sm">No followers yet.</p>
              )}
            </motion.div>
          </div>
        </>
      )}

      {showFollowing && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-cover bg-center bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
              style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
            >
              <div className="relative mb-4">
                <h3 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  Following
                </h3>
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-white"
                  onClick={() => setShowFollowing(false)}
                >
                  ✕
                </button>
              </div>

              {followingList.length > 0 ? (
                <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {followingList.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => handleUserClick(user.id)}
                      className="cursor-pointer flex items-center gap-3 p-2 border-b border-blue-400 hover:border-orange-400"
                    >
                      <img
                        src={`http://localhost:3000${user.avatar}`}
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover border border-gray-500"
                      />
                      <span>{user.username}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300 text-sm">
                  Not following anyone yet.
                </p>
              )}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
