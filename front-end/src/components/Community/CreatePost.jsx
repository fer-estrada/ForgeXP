import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [PostType, setPostType] = useState("text");
  const [content, setContent] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetchCreatePost();
    navigate("/community");
  }

  async function fetchCreatePost() {
    const formData = new FormData();
    console.log(["COMMUNITYID HERE", params]);
    formData.append("communityId", params.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("PostType", PostType);
    formData.append("content", content);

    const response = await fetch(`${address}/post/create`, { //update address here
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
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-3 bg-gray-900 border border-orange-400 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 bg-gray-900 border border-orange-400 rounded-md placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 min-h-[120px]"
          />

          <select
            value={PostType}
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

          {PostType === "image" && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setContent(e.target.files[0])}
              className="file:bg-white file:text-black file:rounded file:px-4 file:py-1 text-sm text-white"
            />
          )}

          {PostType === "video" && (
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
