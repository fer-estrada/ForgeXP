import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("text");
  const [content, setContent] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const communityId = await fetchCommunity();
    await fetchCreatePost(communityId);

    navigate("/community");
  }

  async function fetchCommunity() {
    const response = await fetch("http://localhost:3000/gamecommunity/all");

    const result = await response.json();
    const community = await result[0].id;
    return community;
  }

  async function fetchCreatePost(communityId) {
    const formData = new FormData();
    formData.append("communityId", communityId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("postType", postType);
    formData.append("content", content);

    const response = await fetch("http://localhost:3000/post/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });
    const result = await response.json();
    return result;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-[#1a1a2e] border border-orange-400 p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-md">
          Create a New Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="Optional Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 bg-gray-900 border border-orange-400 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
              
          <textarea
            placeholder="Text (required)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-3 bg-gray-900 border border-orange-400 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 min-h-[120px]"
          />

          <select
            value={postType}
            onChange={(e) => {
              setPostType(e.target.value);
              setContent(null);
            }}
            className="p-3 bg-gray-900 border border-orange-400 rounded-md text-white"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="text">Text</option>
          </select>

          {postType === "image" && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setContent(e.target.files[0])}
              className="file:bg-white file:text-black file:rounded file:px-4 file:py-1 text-sm text-white"
            />
          )}

          {postType === "video" && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-white font-medium">
                  Upload Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setContent(e.target.files[0])}
                  className="file:bg-white file:text-black file:rounded file:px-4 file:py-1 text-sm text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-white font-medium">
                  Or Paste YouTube Link
                </label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="p-3 bg-gray-900 border border-orange-400 rounded-md placeholder-white text-white w-full"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-white hover:bg-orange-300 text-white font-bold py-3 rounded-md transition duration-300 shadow-lg"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
