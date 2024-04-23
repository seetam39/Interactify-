// import React from "react";
import MessageContainer from "../../../src/components/messages/MessageContainer";
import Sidebar from "../../../src/components/sidebar/Sidebar";
import Topbar from "../../../src/components/topbar/Topbar";
import React, { useState } from 'react'
import './Home.css';
import { ImCross } from "react-icons/im";
import Bottombar from "../../components/topbar/bottombar";
import Search from "../../components/sidebar/Search";
import { useAuthContext } from "../../context/AuthContext";
import Ssidebar from "../../components/secondsidebar/ssidebar";


const Home = () => {
	const { authUser } = useAuthContext();
  const [bar, setBar] = useState("hidden");

  const barfunc=()=>{
    setBar("block")
  }


  const closefunc = () => {
    setBar("hidden")
  };
  return (




    <>
   <div className="absolute overflow-y-hidden ">
    <Search/>
   
   <Topbar/>

  

<div className="flex">
     

<Ssidebar/>
         

      <div className='flex  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0' id="home-div">
      {/* <div className='flex  rounded-lg overflow-hidden bg-black' id="home-div"> */}
        

        <Sidebar id="side"></Sidebar>
        <MessageContainer />
      </div>

      </div>
      <Bottombar/>






     </div>
    </>
  );
};

export default Home;
