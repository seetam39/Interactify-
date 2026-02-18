import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendRequests,
    searchUsers,
    removeFriend
} from "../controllers/friendRequest.controller.js";

const router = express.Router();

// Search users
router.get("/search", protectRoute, searchUsers);

// Send friend request
router.post("/send/:userId", protectRoute, sendFriendRequest);

// Accept friend request
router.put("/accept/:requestId", protectRoute, acceptFriendRequest);

// Reject friend request
router.put("/reject/:requestId", protectRoute, rejectFriendRequest);

// Get friend requests
router.get("/requests", protectRoute, getFriendRequests);

// Remove friend
router.delete("/remove/:userId", protectRoute, removeFriend);

export default router;
