import { address } from "../../../address"; //update address here
console.log('address =>', address);

function UserCommCard({ comm }) {
  return (
    <>
      <div className="flex gap-6 items-start">
        <img
          src={`${address}${comm.coverImage}`} //update address here
          alt={comm.gameName}
          className="w-28 h-28 object-cover rounded-lg "
        />

        <div className="flex-1">
          <h4 className="text-xl font-semibold text-white mb-2 drop-shadow-[0_0_6px_rgba(0,0,255,0.4)]">
            {comm.gameName}
          </h4>
          <p className="text-gray-300 text-sm mb-3">
            {comm.description || "No description available."}
          </p>
        </div>
      </div>
    </>
  );
}

export default UserCommCard;
