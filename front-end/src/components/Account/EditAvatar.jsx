import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { address } from "../../../address"; //update address here
console.log('address =>', address); 

export default function EditAvatar({ isOpen, onClose, onSave }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];
  
    if (selectedFile && !acceptedTypes.includes(selectedFile.type)) {
      setFileError("Unsupported file type. Please upload a JPG or PNG image.");
      return;
    }
  
    setFileError("");
    setFile(selectedFile);
  };

  const changedAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", file);
    console.log("Result =>", formData);

    const response = await fetch(`${address}/user/avatar`, { //update address here
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

      body: formData,
    });
    const result = await response.json();
    if (result.error) {
      return console.log(result.error);
    }
    window.location.reload();
  };

  // Close modal with ESC key!
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay with blur and opacity */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* Centered modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-cover bg-center bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
        >
          {/* Close button with Lucide icon */}
          <button
            className="absolute top-2 right-3 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Edit Avatar
          </h2>

          {/* Avatar URL input */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Avatar URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="Paste image URL..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* File upload input */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-400 "
            />
              {fileError && (
    <p className="text-red-400 text-sm mt-2">{fileError}</p>
  )}
          </div>

          {/* Action buttons (need to make a delete maybe?) */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
            >
              Cancel
            </button>
            <button
              onClick={changedAvatar}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
