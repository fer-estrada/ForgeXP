import { address } from "../../../address"; //update address here
console.log('address =>', address); 

export default function SingleUserDetails({ user }) {
  if (!user) return <div className="text-shadow-orange-400">Loading...</div>;

    return (
      <div className="   p-6 mb-10 ">
        <h3 className="text-2xl font-semibold text-center mb-4 text-white drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
          Bio
        </h3>
        <p className="text-gray-300 text-center whitespace-pre-wrap">
          {user.bio || "This user hasn't added a bio yet!"}
        </p>
      </div>
    );
  }
  
