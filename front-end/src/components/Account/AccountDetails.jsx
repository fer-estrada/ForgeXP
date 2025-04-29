import { address } from "../../../address"; //update address here

console.log('address =>', address);

export default function AccountDetails({ user }) {
  return (
    <div className="text-white px-4 py-10 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold pb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          My Profile
        </h2>

        {/* <div className="mx-auto  h-0.5 bg-orange-500 rounded-full"></div> */}
      </div>

      <div className="bg-[#1a1e2e] rounded-2xl p-6 mb-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        <h3 className="text-2xl font-semibold text-center mb-4 text-white drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
          Bio
        </h3>

        <p className="text-gray-300 text-center whitespace-pre-wrap border-t  py-3">
          {user.bio || "No bio available. Update your profile!"}
        </p>
      </div>
    </div>
  );
}
