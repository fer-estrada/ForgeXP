function GameCard({ game }) {
  return (
    <div className="w-full">
      <div className="relative w-full max-w-[200px] mx-auto transition-transform duration-300 hover:scale-105">
        <img
          src={`http://localhost:3000${game.coverImage}`}
          alt="Game cover"
          className="w-full h-[280px] object-cover rounded-xl"
        />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-400/70 text-white text-xs px-2 py-1 rounded-md shadow">
          Posts #
        </div>
      </div>
    </div>
  );
}

export default GameCard;

  
  