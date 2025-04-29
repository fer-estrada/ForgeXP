import mockData from "../../data/mockData";
import { Link } from "react-router-dom";
import { address } from "../../../address"; //update address here
console.log('address =>', address);   

export default function TopRated() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg p-3 shadow-lg h-[calc(100vh-250px)] w-[70px] sm:w-[90px] md:w-[100px] lg:w-[120px] overflow-y-auto space-y-4 shrink-0 mt-4 scrollbar-thin">
      <h4 className="text-blue-400 text-xs font-semibold text-center mb-2">
        Top Rated
      </h4>
      {mockData.slice(8, 16).map((game) => (
        <Link
          to={`/games/${game.id}`}
          key={game.id}
          className="block bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition"
        >
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover}.jpg`}
            alt={game.name}
            className="w-full h-auto object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
