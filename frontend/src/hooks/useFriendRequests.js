import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FriendEvents from "../utils/friendEvents";

const useFriendRequests = () => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);

    const getFriendRequests = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/friends/requests");
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setRequests(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const acceptFriendRequest = async (requestId) => {
        try {
            const res = await fetch(`/api/friends/accept/${requestId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(data.message);
            setRequests(requests.filter(req => req._id !== requestId));
            // Emit event to refresh conversations
            FriendEvents.emit("friendsUpdated", {});
        } catch (error) {
            toast.error(error.message);
        }
    };

    const rejectFriendRequest = async (requestId) => {
        try {
            const res = await fetch(`/api/friends/reject/${requestId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(data.message);
            setRequests(requests.filter(req => req._id !== requestId));
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getFriendRequests();
    }, []);

    return { loading, requests, getFriendRequests, acceptFriendRequest, rejectFriendRequest };
};

export default useFriendRequests;
