import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchUser from "../SearchUser";
import CommCard from "../Community/CommCard";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

function Community() {
  const navigate = useNavigate();
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      const response = await fetch("${address}/post/all"); //update address here
      const result = await response.json();
      setPostList(result.post);
    }
    fetchPostList();
  }, [refreshToggle]);

  return (
    <div className="min-h-screen text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center mb-10">
          <h1 className="text-4xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] ">
           All Community Posts
          </h1>
         
        </div>
        <p></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {postList.map((post) => (
            <CommCard
              key={post.id}
              post={post}
              setRefreshToggle={setRefreshToggle}
              refreshToggle={refreshToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;
