import { useEffect, useState } from "react";
import UserCommCard from "./UserCommCard";
import { useNavigate } from "react-router-dom";
import { address } from "../../../address"; //update address here

export default function Communities({ user }) {
  const [userCommunities, setUserCommunities] = useState(null);
  const navigate = useNavigate();
  console.log("comm useState => ", userCommunities);
  console.log('address => ',address);

  useEffect(() => {
    setUserCommunities(user.communities);
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-10 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold pb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          My Communities
        </h2>
        <p></p>
      </div>

      <div className="flex flex-col gap-8 ">
        {userCommunities ? (
          userCommunities.map((comm) => (
            <div
              key={comm.id}
              onClick={() => navigate(`/games/${comm.id}`)} // <-- NEW
              className="bg-[#111827] rounded-xl p-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] border border-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <UserCommCard comm={comm} />
            </div>
          ))
        ) : (
          <div>Loading . . .</div>
        )}
      </div>
    </div>
  );
}
