import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import FriendEvents from "../utils/friendEvents";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	const getConversations = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users");
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			setConversations(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getConversations();

		// Listen for friend-related events to refresh conversations
		const handleRefresh = () => {
			getConversations();
		};

		FriendEvents.on("friendsUpdated", handleRefresh);

		return () => {
			FriendEvents.off("friendsUpdated", handleRefresh);
		};
	}, [getConversations]);

	return { loading, conversations, refreshConversations: getConversations };
};
export default useGetConversations;
