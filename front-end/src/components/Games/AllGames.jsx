import { Link, Navigate } from "react-router-dom";
import GameCard from "./GameCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewGameForm from "./NewGameForm";
import ReturnButton from "../ReturnButton";
import AddGameButton from "./AddGameButton";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function AllGames() {
  const [gameList, setGameList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [showGameForm, setShowGameForm] = useState(false);

  console.log("gameList useState =>", gameList);
  console.log("isAdmin useState =>", isAdmin);

  useEffect(() => {
    async function fetchIsAdmin() {
      const response = await fetch(`${address}/user/info`, { //update address here
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setIsAdmin(result.user.isAdmin);
    }
    fetchIsAdmin();
  }, []);

  useEffect(() => {
    async function fetchGameList() {
      const response = await fetch(`${address}/games/all`); //update address here
      const result = await response.json();
      setGameList(result.games);
    }
    fetchGameList();
  }, []);

  function clickHandle(id) {
    console.log("tp to page :)"); //REMOVE LATER
    navigate(`../games/${id}`);
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden ">
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow p-6">
          {isAdmin && (
            <div className="mb-6">
              <AddGameButton onClick={() => setShowGameForm(true)} />
          </div>
          )}

          <h2 className="text-4xl font-bold mb-6 border-b border-blue-600 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] pb-2">
            All Games
          </h2>

          {gameList ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              {gameList.map((game) => (
                <div key={game.id} onClick={() => clickHandle(game.id)}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <h2>"loading . . ."</h2>
          )}
        </main>
      </div>
      <div className="flex justify-center">
        <ReturnButton />
      </div>

      {/* Modal Component */}
      <NewGameForm
        isOpen={showGameForm}
        onClose={() => setShowGameForm(false)}
      />
    </div>
  );
}
