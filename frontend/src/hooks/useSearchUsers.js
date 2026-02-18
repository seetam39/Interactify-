import { useState } from "react";
import toast from "react-hot-toast";
import FriendEvents from "../utils/friendEvents";

const useSearchUsers = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const searchUsers = async (search) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/friends/search?search=${encodeURIComponent(search)}`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setUsers(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const sendFriendRequest = async (userId) => {
        try {
            const res = await fetch(`/api/friends/send/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(data.message);
            // Update the user status in the list
            setUsers(users.map(user => 
                user._id === userId ? { ...user, friendStatus: "requestSent" } : user
            ));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeFriend = async (userId) => {
        try {
            const res = await fetch(`/api/friends/remove/${userId}`, {
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
            // Update the user status in the list
            setUsers(users.map(user => 
                user._id === userId ? { ...user, friendStatus: "none" } : user
            ));
            // Emit event to refresh conversations
            FriendEvents.emit("friendsUpdated", {});
        } catch (error) {
            toast.error(error.message);
        }
    };

    return { loading, users, searchUsers, sendFriendRequest, removeFriend };
};

export default useSearchUsers;
