import UserPostCard from "../Account/UserPostCard";
import { address } from "../../../address"; //update address here
console.log('address =>', address); 

export default function SingleUserUploads({ userPosts }) {
    if (!userPosts) {
      return (
        <div className="text-center text-gray-300 mt-8">
          Loading uploads...
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-800 text-white px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          User's Uploads
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#111827] border border-blue-700 rounded-xl p-6 shadow-[0_0_20px_#9333ea50] hover:shadow-blue-700 transition duration-300"
              >
                <UserPostCard post={post} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 text-lg">
              No uploads yet!
            </div>
          )}
        </div>
      </div>
    );
  }