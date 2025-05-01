import { address } from "../../../address";
import { useState } from "react";

export default function EditPost({ post, onCancel, onUpdate }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [newFile, setNewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("postId", post.id);
      formData.append("title", title);
      formData.append("description", description);
      if (newFile) {
        formData.append("content", newFile);
      }

      const res = await fetch(`${address}/post/edit`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (res.ok) {
        const updatedPost = await res.json();
        alert("Post updated successfully!");
        onUpdate(updatedPost);
      } else {
        alert("Failed to update post.");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 border border- text-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-auto ">
      <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
        Edit Your Post
      </h2>

      {previewUrl && (
        <div className="mb-6">
          <label className="block mb-2 text-sm text-blue-700">New Upload Preview</label>
          {newFile?.type.startsWith("image") ? (
            <img src={previewUrl} alt="Preview" className="max-h-64 rounded border bordershadow-md" />
          ) : (
            <video src={previewUrl} controls className="w-full max-h-64 rounded border shadow-md" />
          )}
        </div>
      )}

      {!previewUrl && post.PostType === "image" && (
        <div className="mb-6">
          <label className="block mb-2 text-sm ">Current Image</label>
          <img src={`${address}${post.content}`} alt="Post" className="max-h-64 rounded border border shadow-md" />
        </div>
      )}

      {!previewUrl && post.PostType === "video" && (
        <div className="mb-6">
          <label className="block mb-2 text-sm ">Current Video</label>
          <video src={`${address}${post.content}`} controls className="w-full max-h-64 rounded border border-blue-700 shadow-md" />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 text-sm  font-semibold">Replace Image/Video</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-orange-600 file:text-white hover:file:bg-orange-500"
        />
      </div>

      <label className="block mb-2 text-blue-200 font-semibold">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 border border-blue-700 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Enter new title"
      />

      <label className="block mb-2 text-blue-200 font-semibold">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 border border-blue-500 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Enter new description"
        rows="4"
      />

      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white border border-gray-400"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded shadow-md disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
