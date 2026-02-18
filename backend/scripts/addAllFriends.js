import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const addAllFriends = async () => {
    await connectDB();

    try {
        // Find the user seetam39
        const seetam39 = await User.findOne({ username: "seetam39" });
        
        if (!seetam39) {
            console.log("User seetam39 not found!");
            process.exit(1);
        }

        console.log(`Found user: ${seetam39.username} (${seetam39._id})`);

        // Get all other users
        const allUsers = await User.find({ _id: { $ne: seetam39._id } });
        console.log(`Found ${allUsers.length} other users`);

        // Add all users as friends to seetam39
        const userIds = allUsers.map(user => user._id);
        
        // Update seetam39's friends array
        await User.findByIdAndUpdate(seetam39._id, {
            $addToSet: { friends: { $each: userIds } }
        });

        // Add seetam39 as friend to all other users
        for (const user of allUsers) {
            await User.findByIdAndUpdate(user._id, {
                $addToSet: { friends: seetam39._id }
            });
        }

        console.log(`Successfully added ${allUsers.length} friends to seetam39`);

        // Verify
        const updatedUser = await User.findById(seetam39._id);
        console.log(`seetam39 now has ${updatedUser.friends.length} friends`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

addAllFriends();
