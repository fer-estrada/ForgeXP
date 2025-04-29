// src/components/ReturnButton.jsx
import { useNavigate } from "react-router-dom";
import { address } from "../../../address"; //update address here
console.log('address =>', address);   

export default function ReturnButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // ← this goes back to the previous page in browser history
  };

  return (
    <button onClick={handleBack} className="button">
      Return
    </button>
  );
}
