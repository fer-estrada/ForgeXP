import { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("image");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaLink, setMediaLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting Post:", { title, description, postType, mediaFile, mediaLink });

    setTitle("");
    setDescription("");
    setPostType("image");
    setMediaFile(null);
    setMediaLink("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-3xl mx-auto bg-[#1a1a2e] border border-blue-600 rounded-2xl shadow-xl p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400 drop-shadow-lg">
          Create a New Post!
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Optional Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border border-cyan-600 focus:border-cyan-400 p-3 rounded-md shadow-inner placeholder-gray-400"
          />

          <textarea
            placeholder="Write your thoughts..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="bg-gray-800 border border-cyan-600 focus:border-cyan-400 p-3 rounded-md shadow-inner placeholder-gray-400 min-h-[100px]"
          />

          <div>
            <label className="block mb-1 font-semibold text-cyan-300">Post Type</label>
            <select
              value={postType}
              onChange={(e) => {
                setPostType(e.target.value);
                setMediaFile(null);
                setMediaLink("");
              }}
              className="bg-gray-800 border border-cyan-600 p-2 rounded-md w-full"
            >
              <option value="image"> Image</option>
              <option value="video"> Video</option>
            </select>
          </div>

          {postType === "image" && (
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMediaFile(e.target.files[0])}
                className="file:bg-blue-700 file:border-none file:rounded file:px-4 file:py-1 text-white"
              />
            </div>
          )}

          {postType === "video" && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-semibold text-cyan-300">Upload Video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setMediaFile(e.target.files[0])}
                  className="file:bg-blue-700 file:border-none file:rounded file:px-4 file:py-1 text-white"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-cyan-300">Or Paste YouTube Link</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/..."
                  value={mediaLink}
                  onChange={(e) => setMediaLink(e.target.value)}
                  className="bg-gray-800 border border-cyan-600 p-2 rounded-md w-full placeholder-gray-400"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 py-3 rounded-md font-bold text-lg shadow-md transition duration-300"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
