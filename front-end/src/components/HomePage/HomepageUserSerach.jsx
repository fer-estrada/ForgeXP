import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { address } from "../../../address"; //update address here
console.log('address =>', address);    

export default function HomePageUserSearch() {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("`${address}/user/usernames`"); //update address here
        const result = await response.json();
        if (!result.error) {
          setUser(result.allUsers);
          setFiltered(result.allUsers);

          // Shuffle and pick two random users
          const shuffled = [...result.allUsers].sort(() => 0.5 - Math.random());
          setRandomUsers(shuffled.slice(0, 2));
        } else {
          console.error("Error fetching users:", result.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const lower = searchTerm.toLowerCase();
      const filteredResults = user.filter((user) =>
        user.username.toLowerCase().includes(lower)
      );
      setFiltered(filteredResults);
      setActiveIndex(-1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, user]);

  const handleClick = (clickedUserId) => {
    const currentUserId = user?.id; // <- This is YOUR logged in user id but its not working

    if (clickedUserId === currentUserId) {
      navigate("/account"); // Go to your own account page
    } else {
      navigate(`/user/${clickedUserId}`); // Go to other user's profile
    }
    setSearchTerm(""); // Clear search bar
  };

  const handleKeyDown = (e) => {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleClick(filtered[activeIndex].id);
    } else if (e.key === "Escape") {
      setSearchTerm("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-900 rounded-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mt-12">
      <div>
        <h1 className="flex justify-center text-2xl font-bold">
          Featured Users
        </h1>
        <p className="flex justify-center mb-5 text-sm">
          Interact to gain XP and become a featured user{" "}
        </p>
      </div>
      {/* Random Users */}
      <div className="flex justify-center gap-8 mb-6">
        {randomUsers.map((user) => {
          const avatarPath = user.avatar
            ? `${address}${user.avatar}` //update address here
            : "/defaultavatar1.png";

          return (
            <div
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)}
              className="relative flex flex-col items-center justify-center gap-2 p-4 rounded-lg shadow cursor-pointer overflow-hidden hover:scale-105 transition-transform"
              style={{
                backgroundImage: `url(${avatarPath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Blurred overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

              {/* Foreground content */}
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={avatarPath} //use avatarpath
                  alt={user.username}
                  className="w-12 h-12 rounded-full border-2 border-white shadow"
                />
                <span className="text-white font-semibold">
                  {user.username}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center">
        <div className="relative w-full sm:w-96">
          <div className="flex items-center bg-gray-800 text-white rounded-full px-4 py-2 shadow-sm border focus-within:ring-2 focus-within:ring-blue-600">
            <Search className="mr-2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search All Users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Dropdown results */}
          {searchTerm && filtered.length > 0 && (
            <ul
              className="absolute mt-2 w-full bg-gray-900 rounded shadow-lg z-50 max-h-60 overflow-y-auto border border-gray-700"
              ref={listRef}
            >
              {filtered.map((user, index) => (
                <li
                  key={user.id}
                  className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition ${
                    index === activeIndex
                      ? "bg-gray-700 text-orange-400"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => handleClick(user.id)}
                >
                  <img
                    src={`http://localhost:3000${user.avatar}`}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover border border-gray-600"
                  />
                  <span>{user.username}</span>
                </li>
              ))}
            </ul>
          )}

          {searchTerm && filtered.length === 0 && (
            <div className="absolute mt-2 w-full bg-gray-900 text-gray-400 text-sm px-4 py-2 rounded shadow border border-gray-700">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
