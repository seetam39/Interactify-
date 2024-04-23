import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { IoMdVideocam } from "react-icons/io";
import Room from "../../pages/room/Room";
import Chatbot from "../../pages/chatbot/chatbot";
import { AiFillAliwangwang } from "react-icons/ai";
import './Topbar.css';


function Topbar() {
	// const { loading, conversations } = useGetConversations();

    const [video, setVideo] = useState("hidden");
    const [bot, setBot] = useState("hidden");

  
    

    const videofunc = () => {
      setVideo("block"); 
    };

    const botfunc = () => {
      setBot("block"); 
    };
  
   
    const closefunc = () => {
      setVideo("hidden"); 
      setBot("hidden"); 
    };

  
  
  return (
    <>

       <div className="h-12 relative bg-slate-100 rounded-2xl flex justify-center items-center text-black" id="topbar">
        <text className="text-3xl font-extrabold text-blue-900"> Interactify </text> 

        <button onClick={botfunc} className="absolute right-40"><AiFillAliwangwang className="text-4xl"/></button>
        <div className={`h-96 w-5/6 bg-white shadow-none border-black absolute top-2 right-auto  z-50 ${bot}`} id="div1">
          <div>
            {/* <h1 className="flex justify-center">Chat Bot</h1> */}
            <button onClick={closefunc} className="absolute top-4 right-6 text-white text-2xl"><ImCross /></button>
          </div>
     
<Chatbot/>
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
