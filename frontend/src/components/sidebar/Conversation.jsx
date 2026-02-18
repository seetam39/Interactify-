import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import FriendEvents from "../../utils/friendEvents";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	const handleRemoveFriend = async (e) => {
		e.stopPropagation();
		try {
			const res = await fetch(`/api/friends/remove/${conversation._id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			toast.success(data.message);
			// Emit event to refresh conversations without page reload
			FriendEvents.emit("friendsUpdated", {});
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-blue-700 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-blue-900" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						{/* <span className='text-xl'>{emoji}</span> */}
					</div>
				</div>

				<button 
					onClick={handleRemoveFriend}
					className="text-red-400 hover:text-red-300 p-1"
					title="Remove friend"
				>
					<FaTrash className="text-sm" />
				</button>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;
