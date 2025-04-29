import "./AddGameButton.css";
import { address } from "../../../address"; //update address here
console.log('address =>', address); 

export default function AddGameButton({ onClick }) {
  return (
    <button className="add-game-btn" onClick={onClick}>
      <span className="icon-text">+</span>
      <span className="label">Add Game</span>
    </button>
  );
}



