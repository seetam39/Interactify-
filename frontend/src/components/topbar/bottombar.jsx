    import React, { useState } from 'react';
import './Topbar.css';
import { AiFillAliwangwang } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { IoMdVideocam } from "react-icons/io";
import Room from "../../pages/room/Room";
import Chatbot from "../../pages/chatbot/chatbot";
// import SearchInput from "../../components/sidebar/SearchInput";
import LogoutButton from "../../components/sidebar/LogoutButton";
// import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "../../components/sidebar/Conversation";
import useGetConversations from "../../hooks/useGetConversations";



function Bottombar() {
const { loading, conversations } = useGetConversations();


    const [video, setVideo] = useState("hidden");
  const [bot, setBot] = useState("hidden");
  const [chat, setChat] = useState("hidden");
  const [chatclick, setChatclick] = useState("");
  const [chatclick2, setChatclick2] = useState("h-12");
  const [btn, setBtn] = useState("hidden");
//   const [botact, setBotact] = useState("");
//   const [chatclick3, setChatclick3] = useState("h-16");
//   const [chatclick4, setChatclick4] = useState("w-16");


  const videofunc = () => {
    setVideo("block"); 
  };

  const botfunc = () => {
    setBot("block"); 
  };

  const chatfunc = () => {
    setChat("block"); 

  };

  const closefunc = () => {
    setVideo("hidden"); 
    setBot("hidden"); 
    // setChat("hidden"); 
    // setChatclick("hidden")
    // setChatclick2("h-4")
    // setBtn("block")
  };

  const closefunc2 = () => {
    setChat("hidden"); 
    setChatclick("hidden")
    setChatclick2("h-4")
    setBtn("block")
  };

//   const chatclickfunc = () => {
//     setChatclick("hidden")
//     setChatclick2("h-6")
//     setBtn("block")
//     // setChatclick3("h-6")
  
//   };
  const botactive = () => {
    // setChatclick2("h-6")
    // setBotact("flex")
    setBtn("hidden")
    setChatclick("block")
    setChatclick2("h-12")

   
  
  };

  return (
    <>
       <div className={`${chatclick2} relative bg-black rounded-2xl  justify-center items-center  hidden z-50  `} id="topbar1">
        {/* <text className="">Chatting - App </text>  */}

        <button onClick={botfunc} ><AiFillAliwangwang className={`text-4xl ${chatclick} `}/></button>
        <div className={` w-5/6  bg-black shadow-none border-black absolute bottom-14 right-auto overflow-y-scroll  ${bot}`}  id="div1">
          <div>
            <h1 className="flex justify-center">Chat Bot</h1>
            <button onClick={closefunc} className="absolute top-2 right-2"><ImCross /></button>
          </div>
     
<Chatbot/>
        </div>

<button className={`bg-white h-3 rounded-md w-16 ${btn}` } onClick={botactive}></button>
        <button onClick={chatfunc} className={`h-20 w-20 rounded-full border-4 border-black flex justify-center items-center  bg-blue-700 z-40 mb-10 ${chatclick} }`} ><i class="fa-brands fa-rocketchat text-4xl text-white" ></i></button>
        <div className={` w-full bg-black rounded-t-lg shadow-none border-black absolute bottom-14 right-auto overflow-y-scroll  ${chat}`} id="div1">
          <div>
            <h1 className="flex justify-center ">Chat</h1>
            <button onClick={closefunc2} className="absolute top-2 right-2 "><ImCross /></button>
          </div>
          <div className='border-r border-slate-500 p-4 flex flex-col bg-black w-vw overflow-x-hidden'>
			
			<div className='divider px-3'></div>

      <div className='py-2 flex flex-col overflow-auto w-vw'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					// emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
			<LogoutButton />
		</div>
</div>

        <button onClick={videofunc} ><IoMdVideocam  className={`text-4xl ${chatclick}  `}/></button>
        <div className={`h-96 w-full bg-black shadow-none border-black absolute bottom-14 right-auto overflow-hidden  ${video} `} id="div1">
          <div>
            <h1 className="flex justify-center font-extrabold text-3xl">Video Call</h1>
            <button onClick={closefunc} className="absolute top-2 right-2 text-white"><ImCross /></button>
          </div>

          <Room/>
        </div>
      </div>
      
      </>
  );
}

export default Bottombar;
