import { useState, useEffect } from "react";
import { X } from "lucide-react";
import RemoveAccount from './RemoveAccount';
import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function SettingsModal({ isOpen, onClose, user, onSave, navigate }) {
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSave = () => {
    onSave({ username, bio });
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* Centered modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-cover bg-center bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
        >

          {/* Close button */}
          <button
            className="absolute top-2 right-3 text-gray-400 hover:text-white"
            onClick={onClose}
            >
            <X size={20} />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
           Settings
          </h2>

          {/* Username input */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Change Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
          </div>

          {/* Bio input */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Edit Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
              rows="4"
              />
          </div>
            {/* {remove account} */}
            <div>
              <RemoveAccount user={user} navigate={navigate} />
            </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
