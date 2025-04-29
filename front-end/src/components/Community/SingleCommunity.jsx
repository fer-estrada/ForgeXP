import { address } from "../../../address"; //update address here
console.log('address =>', address);

const SingleCommunity = () => {
    const gamecommunity = {
        name: 'community',
        description: 'description',
        users: 2
    }

    let isJoined = false /* maybe have a .find to see if logged in user is in the gamecommunity user array */

    function onJoinToggle() {
        isJoined = true /* join the community duh */
    }

    const memberCount = gamecommunity.users.length /* this was actually an idea by my friend so thank her */
reqqwa
    return (
    <div className="max-w-4xl mx-auto p-4">
        {/* Community Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{gamecommunity.name}</h1>
                <p className="text-gray-600 mt-2">{gamecommunity.description}</p>
                <p className="text-sm text-gray-500 mt-3">{memberCount} members</p>
            </div>

            <button
                onClick={onJoinToggle}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                isJoined
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
            >
                {isJoined ? "Joined" : "Join"}
            </button>
            </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200 mb-6"></div>

        {/* Posts Container */}
        <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">Posts will appear here</div>
        </div>
    </div>
    );
}

export default SingleCommunity;