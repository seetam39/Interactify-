import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Get users for sidebar (only friends)
export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const user = await User.findById(loggedInUserId).populate("friends", "-password");

		res.status(200).json(user.friends);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Search users to send friend request
export const searchUsers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const { search } = req.query;

		const query = { _id: { $ne: loggedInUserId } };
		if (search) {
			query.$or = [
				{ username: { $regex: search, $options: "i" } },
				{ fullName: { $regex: search, $options: "i" } }
			];
		}

		const users = await User.find(query).select("-password");

		// Get friend requests sent by current user
		const sentRequests = await FriendRequest.find({
			sender: loggedInUserId,
			status: "pending"
		}).select("receiver");

		const sentRequestIds = sentRequests.map(req => req.receiver.toString());

		// Get friend requests received by current user
		const receivedRequests = await FriendRequest.find({
			receiver: loggedInUserId,
			status: "pending"
		}).select("sender");

		const receivedRequestIds = receivedRequests.map(req => req.sender.toString());

		// Get current user
		const currentUser = await User.findById(loggedInUserId);
		const friendIds = currentUser.friends.map(friend => friend.toString());

		// Add friend status to each user
		const usersWithStatus = users.map(user => {
			const userId = user._id.toString();
			return {
				...user.toObject(),
				friendStatus: friendIds.includes(userId) 
					? "friends" 
					: sentRequestIds.includes(userId) 
						? "requestSent" 
						: receivedRequestIds.includes(userId) 
							? "requestReceived" 
							: "none"
			};
		});

		res.status(200).json(usersWithStatus);
	} catch (error) {
		console.error("Error in searchUsers: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Send friend request
export const sendFriendRequest = async (req, res) => {
	try {
		const { userId } = req.params;
		const senderId = req.user._id;

		if (senderId.toString() === userId) {
			return res.status(400).json({ error: "You cannot send friend request to yourself" });
		}

		// Check if already friends
		const sender = await User.findById(senderId);
		if (sender.friends.includes(userId)) {
			return res.status(400).json({ error: "You are already friends" });
		}

		// Check if request already exists
		const existingRequest = await FriendRequest.findOne({
			$or: [
				{ sender: senderId, receiver: userId },
				{ sender: userId, receiver: senderId }
			],
			status: "pending"
		});

		if (existingRequest) {
			return res.status(400).json({ error: "Friend request already exists" });
		}

		const friendRequest = new FriendRequest({
			sender: senderId,
			receiver: userId
		});

		await friendRequest.save();

		// Emit socket event to receiver
		const receiverSocketId = getReceiverSocketId(userId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newFriendRequest", { requestId: friendRequest._id });
		}

		res.status(200).json({ message: "Friend request sent successfully" });
	} catch (error) {
		console.error("Error in sendFriendRequest: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Accept friend request
export const acceptFriendRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const userId = req.user._id;

		const friendRequest = await FriendRequest.findById(requestId);

		if (!friendRequest) {
			return res.status(404).json({ error: "Friend request not found" });
		}

		if (friendRequest.receiver.toString() !== userId.toString()) {
			return res.status(403).json({ error: "You are not authorized to accept this request" });
		}

		if (friendRequest.status !== "pending") {
			return res.status(400).json({ error: "This request has already been processed" });
		}

		friendRequest.status = "accepted";
		await friendRequest.save();

		// Add friends to both users
		await User.findByIdAndUpdate(friendRequest.sender, {
			$addToSet: { friends: friendRequest.receiver }
		});

		await User.findByIdAndUpdate(friendRequest.receiver, {
			$addToSet: { friends: friendRequest.sender }
		});

		// Emit socket event to sender
		const senderSocketId = getReceiverSocketId(friendRequest.sender.toString());
		if (senderSocketId) {
			io.to(senderSocketId).emit("friendRequestAccepted", { userId: friendRequest.receiver });
		}

		res.status(200).json({ message: "Friend request accepted" });
	} catch (error) {
		console.error("Error in acceptFriendRequest: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Reject friend request
export const rejectFriendRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const userId = req.user._id;

		const friendRequest = await FriendRequest.findById(requestId);

		if (!friendRequest) {
			return res.status(404).json({ error: "Friend request not found" });
		}

		if (friendRequest.receiver.toString() !== userId.toString()) {
			return res.status(403).json({ error: "You are not authorized to reject this request" });
		}

		friendRequest.status = "rejected";
		await friendRequest.save();

		res.status(200).json({ message: "Friend request rejected" });
	} catch (error) {
		console.error("Error in rejectFriendRequest: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Get friend requests
export const getFriendRequests = async (req, res) => {
	try {
		const userId = req.user._id;

		// Get pending requests received by the user
		const requests = await FriendRequest.find({
			receiver: userId,
			status: "pending"
		}).populate("sender", "fullName username profilePic");

		res.status(200).json(requests);
	} catch (error) {
		console.error("Error in getFriendRequests: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Get all users (for discovery)
export const getAllUsers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const user = await User.findById(loggedInUserId);
		
		// Get users who are not friends and no pending request exists
		const sentRequests = await FriendRequest.find({
			sender: loggedInUserId,
			status: "pending"
		}).select("receiver");

		const receivedRequests = await FriendRequest.find({
			receiver: loggedInUserId,
			status: "pending"
		}).select("sender");

		const excludedIds = [
			...user.friends,
			...sentRequests.map(r => r.receiver),
			...receivedRequests.map(r => r.sender),
			loggedInUserId
		];

		const users = await User.find({
			_id: { $nin: excludedIds }
		}).select("-password");

		res.status(200).json(users);
	} catch (error) {
		console.error("Error in getAllUsers: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Remove friend
export const removeFriend = async (req, res) => {
	try {
		const { userId } = req.params;
		const currentUserId = req.user._id;

		// Remove friend from current user's list
		await User.findByIdAndUpdate(currentUserId, {
			$pull: { friends: userId }
		});

		// Remove current user from friend's list
		await User.findByIdAndUpdate(userId, {
			$pull: { friends: currentUserId }
		});

		// Emit socket event to the removed friend
		const removedFriendSocketId = getReceiverSocketId(userId);
		if (removedFriendSocketId) {
			io.to(removedFriendSocketId).emit("friendRemoved", { userId: currentUserId });
		}

		res.status(200).json({ message: "Friend removed successfully" });
	} catch (error) {
		console.error("Error in removeFriend: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
