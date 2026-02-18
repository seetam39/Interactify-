import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useGetConversations from "./useGetConversations";
import useFriendRequests from "./useFriendRequests";

const useFriendSocketEvents = () => {
    const { socket } = useSocketContext();
    const { refreshConversations } = useGetConversations();
    const { getFriendRequests } = useFriendRequests();

    useEffect(() => {
        if (!socket) return;

        // Listen for new friend request
        socket.on("newFriendRequest", () => {
            getFriendRequests();
        });

        // Listen for friend request accepted
        socket.on("friendRequestAccepted", () => {
            refreshConversations();
            getFriendRequests();
        });

        // Listen for friend removed
        socket.on("friendRemoved", () => {
            refreshConversations();
        });

        return () => {
            socket.off("newFriendRequest");
            socket.off("friendRequestAccepted");
            socket.off("friendRemoved");
        };
    }, [socket, refreshConversations, getFriendRequests]);
};

export default useFriendSocketEvents;
