import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { IoMdVideocam } from "react-icons/io";
import Room from "../../pages/room/Room";
import Chatbot from "../../pages/chatbot/chatbot";
import { AiFillAliwangwang } from "react-icons/ai";
import { FaUserFriends, FaCheck, FaTimes } from "react-icons/fa";
import useFriendRequests from "../../hooks/useFriendRequests";
import './Topbar.css';

function Topbar() {
    const [video, setVideo] = useState("hidden");
    const [bot, setBot] = useState("hidden");
    const [friendRequestsOpen, setFriendRequestsOpen] = useState("hidden");
    const { requests, acceptFriendRequest, rejectFriendRequest, getFriendRequests } = useFriendRequests();

    const videofunc = () => {
        setVideo("block");
    };

    const botfunc = () => {
        setBot("block");
    };

    const friendRequestsfunc = () => {
        setFriendRequestsOpen("block");
        getFriendRequests();
    };

    const closefunc = () => {
        setVideo("hidden");
        setBot("hidden");
        setFriendRequestsOpen("hidden");
    };

    return (
        <>
            <div className="h-12 relative bg-slate-100 rounded-2xl flex justify-center items-center text-black" id="topbar">
                <text className="text-3xl font-extrabold text-blue-900"> Interactify </text>

                <button onClick={botfunc} className="absolute right-40"><AiFillAliwangwang className="text-4xl"/></button>
                <div className={`h-96 w-5/6 bg-white shadow-none border-black absolute top-2 right-auto  z-50 ${bot}`} id="div1">
                    <div>
                        <button onClick={closefunc} className="absolute top-4 right-6 text-white text-2xl"><ImCross /></button>
                    </div>
                    <Chatbot/>
                </div>

                <button onClick={friendRequestsfunc} className="absolute right-24 relative">
                    <FaUserFriends className="text-4xl" />
                    {requests.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {requests.length}
                        </span>
                    )}
                </button>
                <div className={`h-96 w-80 bg-white shadow-lg border-black absolute top-2 right-24 z-50 overflow-y-auto ${friendRequestsOpen}`} id="friendRequests">
                    <div className="flex justify-between items-center p-3 border-b">
                        <h2 className="font-bold text-lg">Friend Requests</h2>
                        <button onClick={closefunc}><ImCross /></button>
                    </div>
                    {requests.length === 0 ? (
                        <p className="p-4 text-center text-gray-500">No pending requests</p>
                    ) : (
                        requests.map((req) => (
                            <div key={req._id} className="flex items-center justify-between p-3 border-b">
                                <div className="flex items-center gap-2">
                                    <div className="avatar">
                                        <div className="w-10 h-10 rounded-full">
                                            <img src={req.sender.profilePic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={req.sender.fullName} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{req.sender.fullName}</p>
                                        <p className="text-xs text-gray-500">@{req.sender.username}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button 
                                        onClick={() => acceptFriendRequest(req._id)}
                                        className="btn btn-sm btn-circle btn-success text-white"
                                    >
                                        <FaCheck />
                                    </button>
                                    <button 
                                        onClick={() => rejectFriendRequest(req._id)}
                                        className="btn btn-sm btn-circle btn-error text-white"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <button onClick={videofunc} className="absolute right-16"><IoMdVideocam  className="text-4xl"/></button>
                <div className={`h-96 w-4/6 bg-gray-900 bg-cover  shadow-none border-black absolute top-2 right-auto overflow-hidden z-50 ${video}`} id="div1">
                    <div>
                        <h1 className="flex justify-center text-white font-bold text-2xl">Video Call</h1>
                        <button onClick={closefunc} className="absolute top-4 right-6 text-2xl text-white"><ImCross /></button>
                    </div>
                    <Room/>
                </div>
            </div>
        </>
    );
}

export default Topbar;
