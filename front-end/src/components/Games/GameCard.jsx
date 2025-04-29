import { address } from "../../../address"; //update address here
console.log('address =>', address);

function GameCard({ game }) {
  return (
    <div>
      <div className="relative w-full flex justify-center transition-transform duration-300 hover:scale-110">
        <img
          src={`${address}${game.coverImage}`} //update address here
          alt="Game cover"
          className="h-60 w-auto object-contain rounded-xl"
        />
        <div className="absolute bottom-2 bg-blue-400/60 text-white text-xs px-2 py-1 rounded-md shadow">
          Posts #
        </div>
      </div>
    </div>
  );
}

export default GameCard;
