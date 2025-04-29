import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { address } from "../../../address"; //update address here
console.log('address =>', address);   

export default function SearchUser() {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // for keyboard navigation, a little extra touch
  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("${address}/user/usernames"); //update address here
        const result = await response.json();
        if (!result.error) {
          setUser(result.allUsers);
          setFiltered(result.allUsers);
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
      setActiveIndex(-1); // reset on new search
    }, 300); // wait 300ms after typing stops

    return () => clearTimeout(timeout);
  }, [searchTerm, user]);

  const handleClick = (userId) => {
    navigate(`/user/${userId}`);
    setSearchTerm("");
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
    <div className="relative w-64">
      <div className="flex items-center bg-gray-800 text-white rounded-full px-4 py-2 shadow-sm border border-blue-500 focus-within:ring-2 focus-within:ring-blue-600">
        <Search className="mr-2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search Users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
        />
      </div>

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
                src={`${address}${user.avatar}`} //update address here
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
  );
}
