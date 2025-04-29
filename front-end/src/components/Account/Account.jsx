import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import EditAvatar from "./EditAvatar";
import { motion, AnimatePresence } from "framer-motion";
import AccountDetails from "./AccountDetails";
import SettingsModal from "./Settings";
import Communities from "./Communities";
import Uploads from "./Uploads";
import Favorites from "./Favorites";
import { X } from "lucide-react";
import { MoreHorizontal, Settings as SettingsIcon } from "lucide-react";
import { address } from "../../../address"; //update address 

export default function Account() {
  const [activeTab, setActiveTab] = useState("details");
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [user, setUser] = useState({});
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });
  console.log('address => ',address);
  

  const tabComponents = {
    details: <AccountDetails user={user} />,
    subscribed: <Communities user={user} />,
    posts: <Uploads user={user} />,
    favorites: <Favorites user={user} />,
  };

  console.log("user useState =>", user);


  useEffect(() => {
    const fetchFollowingList = async () => {
      const response = await fetch("${address}/user/following", {  //update address 
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setFollowingList(data.following);
    };

    const fetchFollowerList = async () => {
      const response = await fetch("${address}/user/followed", {  //update address 
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();

      setFollowerList(data.followedBy);
    };

    fetchFollowerList();
    fetchFollowingList();
  }, [showFollowing, showFollowers]);


  useEffect(() => {
    setFollowCounts({
      followers: followerList.length,
      following: followingList.length,
    });
  }, [followerList, followingList]);

  //===========User info useEffect==================
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("${address}/user/info", {  //update address 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const user = await res.json();
        setUser(user.user);
        setCurrentUserId(user.user.id);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUserClick = (userId) => {
    setShowFollowers(false);
    setShowFollowing(false);

    setTimeout(() => {
      if (userId === currentUserId) {
        navigate("/account");
      } else {
        navigate(`/user/${userId}`);
      }
    }, 100);
  };

  const handleSaveSettings = async (updatedFields) => {
    try {
      const response = await fetch(`${address}/user/update/${user.id}`, {  //update address 
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedFields), // <- SEND THE WHOLE OBJECT
      });
  
      if (response.ok) {
        const result = await response.json();
        setUser(result.updatedData); // <- Update with new user info
        setShowSettings(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  {
    /* Remember that a version of this is needed to display an admin dashboard for when logged in as admin */
  }
  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto ">
      {/* Avatar + Username !!!Add functionality later */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={`${address}${user.avatar}`} //update address 
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover shadow-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
          <button
            onClick={() => setShowEditAvatar(true)}
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full border border-white hover:bg-orange-500 transition cursor-pointer"
            title="Edit Profile Picture"
          >
            <Pencil size={16} />
          </button>

          <EditAvatar
            isOpen={showEditAvatar}
            onClose={() => setShowEditAvatar(false)}
            onSave={() => {
              // Hook up save logic later
              setShowEditAvatar(false);
            }}
          />
        </div>
        {/* <h2 className="text-xl mt-4 font-bold ">@{user.username}</h2> */}
        <div className="flex items-center gap-2 mt-4">
          <h2 className="text-xl font-bold">@{user.username}</h2>

          <button
            onClick={() => setShowSettings(true)}
            className="text-gray-400 hover:text-orange-400 transition"
            title="Edit Settings"
          >
            <SettingsIcon size={20} />
          </button>
        </div>
      </div>
      <div className="flex gap-6 mt-2 mb-6 text-center justify-center">
        <button
          onClick={() => {
            setShowFollowers(true);
          }}
          className="hover:text-orange-400 transition flex flex-col"
        >
          <span className="text-lg font-bold cursor-pointer">
            {followCounts.followers}
          </span>
          <span className="text-sm cursor-pointer">Followers</span>
        </button>
        <button
          onClick={() => {
            setShowFollowing(true);
          }}
          className="hover:text-orange-400 transition flex flex-col"
        >
          <span className="text-lg font-bold cursor-pointer">
            {followCounts.following}
          </span>
          <span className="text-sm cursor-pointer">Following</span>
        </button>
      </div>

      {/* Tabs (!!!remove "Uploads" tab and put that in Main Content section) */}
      <div className="bg-gray-900 rounded-lg p-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-7 ">
        {/* Tabs Section - Responsive */}
        <div className="border-b border-gray-700 pb-2 mb-4">
          {/* Desktop Tabs */}
          <div className="hidden sm:flex justify-center gap-3 text-sm sm:text-base">
            {["details", "subscribed", "posts", "favorites"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`hover:text-orange-400 cursor-pointer ${
                  activeTab === tab && "text-orange-500 font-semibold"
                }`}
              >
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="sm:hidden mt-2">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-gray-800 text-white border border-orange-500 rounded px-3 py-2 focus:outline-none focus:ring-2"
            >
              {["details", "subscribed", "posts", "favorites"].map((tab) => (
                <option key={tab} value={tab}>
                  {tab[0].toUpperCase() + tab.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Animated content section: !!!Fix exit animation */}
        <div className="bg-gray-800 rounded-md p-4 min-h-[200px]  ">
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
      {showFollowing && (
        <>
          {/* Backdrop blur and dark layer */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

          {/* Centered modal container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-cover bg-center bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
              style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
            >
              <div className="relative mb-4">
                <h3 className="text-2xl font-bold text-white">Following</h3>
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-white"
                  onClick={() => setShowFollowing(false)}
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {followingList.length > 0 ? (
                <ul className="text-white space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {followingList.map((user) => (
                    <li
                      key={user.id}
                      className="relative flex items-center justify-between p-2 border-b border-blue-400 hover:border-orange-400"
                    >
                      {/* Avatar + Username */}
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => handleUserClick(user.id)}
                      >
                        <img
                          src={`${address}${user.avatar}`} //update address here
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover border border-gray-500"
                        />
                        <span>{user.username}</span>
                      </div>

                      {/* Three-dot dropdown */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFollowingList((prev) =>
                              prev.map((u) =>
                                u.id === user.id
                                  ? { ...u, showOptions: !u.showOptions }
                                  : { ...u, showOptions: false }
                              )
                            );
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {user.showOptions && (
                          <div className="fixed z-[9999] right-6 top-auto mt-1 w-24 bg-gray-900 border border-gray-700 rounded shadow-lg">
                            <button
                              onClick={() => handleUnfollow(user.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-orange-600 cursor-pointer"
                            >
                              Unfollow
                            </button>
                          </div>
                        )}
                      </div>
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
                  Following
                </h3>
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-white "
                  onClick={() => setShowFollowers(false)}
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
              {followerList.length > 0 ? (
                <ul className="text-white space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {followerList.map((follower) => (
                    <li
                      key={follower.id}
                      className="relative flex items-center justify-between cursor-pointer p-2 border-b border-blue-400 hover:border-orange-400"
                    >
                      {/* Avatar + Username (clickable) */}
                      <div
                        className="flex items-center gap-3"
                        onClick={() => handleUserClick(follower.id)}
                      >
                        <img
                          src={`${address}${follower.avatar}`} //update address here
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover border border-gray-500"
                        />
                        <span>{follower.username}</span>
                      </div>

                      {/* Three-dot dropdown */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFollowerList((prev) =>
                              prev.map((f) =>
                                f.id === follower.id
                                  ? { ...f, showOptions: !f.showOptions }
                                  : { ...f, showOptions: false }
                              )
                            );
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {follower.showOptions && (
                          <div className="fixed z-[9999] right-6 top-auto mt-1 w-24 bg-gray-900 border border-gray-700 rounded shadow-lg">
                            <button
                              onClick={() => handleRemove(follower.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-orange-600 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
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
      {showSettings && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <SettingsModal
              isOpen={showSettings}
              onClose={() => setShowSettings(false)}
              user={user}
              onSave={handleSaveSettings}
              navigate={navigate}
            />
          </div>
        </>
      )}
    </div>
  );
}