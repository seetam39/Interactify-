import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useSearchUsers from "../../hooks/useSearchUsers";
import toast from "react-hot-toast";
import { FaUserPlus, FaCheck, FaClock, FaUserFriends, FaTrash } from "react-icons/fa";
import FriendEvents from "../../utils/friendEvents";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const { setSelectedConversation } = useConversation();
    const { loading, users, searchUsers, sendFriendRequest, removeFriend } = useSearchUsers();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long");
        }
        searchUsers(search);
        setShowResults(true);
    };

    const handleStartConversation = (user) => {
        setSelectedConversation(user);
        setSearch("");
        setShowResults(false);
    };

    const handleSendRequest = async (userId) => {
        await sendFriendRequest(userId);
    };

    const handleRemoveFriend = async (userId) => {
        if (window.confirm("Are you sure you want to remove this friend?")) {
            await removeFriend(userId);
            // Emit event to refresh conversations
            FriendEvents.emit("friendsUpdated", {});
        }
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className='flex items-center gap-2'>
                <input
                    type='text'
                    placeholder='Search users…'
                    className='input input-bordered rounded-full w-80'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type='submit' className='btn btn-circle bg-blue-700 text-white'>
                    <IoSearchSharp className='w-6 h-6 outline-none' />
                </button>
            </form>

            {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {loading ? (
                        <div className="p-4 text-center text-white">Loading...</div>
                    ) : users.length === 0 ? (
                        <div className="p-4 text-center text-white">No users found</div>
                    ) : (
                        users.map((user) => (
                            <div key={user._id} className="flex items-center justify-between p-3 hover:bg-gray-700 border-b border-gray-600">
                                <div className="flex items-center gap-3" onClick={() => user.friendStatus === "friends" && handleStartConversation(user)}>
                                    <div className="avatar">
                                        <div className="w-10 h-10 rounded-full">
                                            <img src={user.profilePic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={user.fullName} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{user.fullName}</p>
                                        <p className="text-sm text-gray-400">@{user.username}</p>
                                    </div>
                                </div>
                                <div>
                                    {user.friendStatus === "friends" ? (
                                        <div className="flex gap-1">
                                            <button 
                                                onClick={() => handleStartConversation(user)}
                                                className="btn btn-sm btn-primary"
                                            >
                                                <FaUserFriends className="mr-1" /> Message
                                            </button>
                                            <button 
                                                onClick={() => handleRemoveFriend(user._id)}
                                                className="btn btn-sm btn-outline btn-error"
                                                title="Remove friend"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ) : user.friendStatus === "requestSent" ? (
                                        <button className="btn btn-sm btn-disabled" disabled>
                                            <FaClock className="mr-1" /> Sent
                                        </button>
                                    ) : user.friendStatus === "requestReceived" ? (
                                        <span className="text-sm text-yellow-400">Wants to connect</span>
                                    ) : (
                                        <button 
                                            onClick={() => handleSendRequest(user._id)}
                                            className="btn btn-sm btn-outline btn-primary"
                                        >
                                            <FaUserPlus className="mr-1" /> Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    <button 
                        className="w-full p-2 text-center text-gray-400 hover:text-white bg-gray-800"
                        onClick={() => setShowResults(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};
export default SearchInput;
