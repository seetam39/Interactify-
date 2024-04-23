import React from 'react';
import { useParams } from 'react-router-dom';
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import "./room.css";
function RoomPage() {
    const {roomId} =useParams();

    const myMeeting = async(element)=>{
        const appID =1140336058 ;
        const serverSecret = "94a8c128481f82cef7bcadf10807cffc";

        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,roomId,Date.now().toString(),'sam');
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,

            sharedLinks:[
                {
                    name:"Copy Link",
                    url:`http://localhost:3000/room/${roomId}`,
                }

            ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,  
        })
    }
  return (
       <div className=' w-full overflow-hidden  ' id="roomdiv">
      <div ref={myMeeting} className='w-screen lg:w-4/5 bg-cover text-white' id="rookmdiv2"></div>
    </div>
  )
}

export default RoomPage;
