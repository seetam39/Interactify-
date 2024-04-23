import React ,{useState}from 'react';
import "../topbar/Topbar.css";
import { useAuthContext } from "../../context/AuthContext";







function Bar() {

const clickfunc=()=>{
    setColor("bg-blue-700")
}
const { authUser } = useAuthContext();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  


  const [color, setColor] = useState("bg-blue-700");
  const [color1, setColor1] = useState("transparent");
  const [color2, setColor2] = useState("transparent");
  const [color3, setColor3] = useState("transparent");
  const [vis, setVis] = useState("hidden");
  const [vis2, setVis2] = useState("hidden");
  const [vis3, setVis3] = useState("hidden");


  const clickfunc2=()=>{
    setColor1(`${color}`)
    setColor2("bg-transparent")
    setColor3("bg-transparent")
    setVis("block")
    setVis2("hidden")
    setVis3("hidden")

  
  }

  const clickfunc3=()=>{
    setColor2(`${color}`)
    setColor1("bg-transparent")
    setColor3("bg-transparent")
    setVis("hidden")
    setVis3("hidden")
    setVis2("block")
    

  }

  const clickfunc6=()=>{
    setColor3(`${color}`)
    setColor1("bg-transparent")
    setColor2("bg-transparent")
    setVis("hidden")
    setVis2("hidden")
    setVis3("block")
    

  }

 

  const clickfunc4=()=>{
    setColor1("bg-transparent")
    setColor3("bg-transparent")
    setColor2("bg-transparent")
    setVis("hidden")
    setVis3("hidden")
    // setColor2("bg-transparent")
    
  }
  
  const clickfunc5=()=>{
    setColor2("bg-transparent")
    setColor3("bg-transparent")
    setColor1("bg-transparent")
    setVis2("hidden")
    setVis3("hidden")
    
  }

  
  const clickfunc7=()=>{
    setColor2("bg-transparent")
    setColor1("bg-transparent")
    setColor3("bg-transparent")
    setVis2("hidden")
    setVis3("hidden")
    
  }
  
  
  const func1=()=>{
    setColor1("bg-red-800")
    setColor2("bg-red-800")
    setColor("bg-red-800")
  }
  
  const func2=()=>{
    setColor1("bg-blue-800")
    setColor2("bg-blue-800")
    setColor("bg-blue-800")
    
  }
  
  const func3=()=>{
    setColor1("bg-green-700")
    setColor2("bg-green-700")
    setColor("bg-green-700")
  }
  
  const func4=()=>{
    setColor1("bg-pink-700")
    setColor2("bg-pink-700")
    setColor("bg-pink-700")
    
  }

  return (
    <>
       <div id="ssidebar2"  className='hidden'>
      <div className='bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0   '  id="s-bar">
      <div className={`h-12 w-16 rounded-2xl ${color} mt-3 mb-4`} onClick={clickfunc}><i class="fa-brands fa-rocketchat"></i></div>
      <div className={`h-12 w-16 rounded-2xl  mt-3 mb-4  ${color1} text-xl`} onClick={clickfunc2}  onDoubleClick={clickfunc4}><i class="fa-solid fa-user"></i></div>
        <div className={`h-12 w-16 rounded-2xl ${color2} text-xl`} onClick={clickfunc3}  onDoubleClick={clickfunc5}><i class="fa-brands fa-affiliatetheme"></i></div>
        <div className={`h-12 w-16 rounded-2xl ${color3} text-xl`} onClick={clickfunc6}  onDoubleClick={clickfunc7}><i class="fa-brands fa-affiliatetheme"></i></div>
      </div>

    <div className={`z-40 ${vis} bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 flex items-center flex-col`} id="p-bar">




    <div className='flex flex-col justify-center items-center mt-8 '>

          <label
            for="file-upload"
            class="custom-file-upload" >
            {image
              ? <img
                className=" h-36 w-36 rounded-full "
                src={image ? URL.createObjectURL(image) : ""}
                alt="img"
              />
              
              : <img
                src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                className="h-20 w-20 "
              />
              }
           

          </label>
{/* <div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
            emoji={getRandomEmoji()}
					</div> */}
        
        </div>


      <p className='text-white m-4  font-bold text-3xl'>{authUser.fullName}  </p>
      <input
            id="file-upload"
            className=' text-white h-7 bg-orange-800 w-24 absolute bottom-1/4'
            type="file"
            onChange={(e) => setImage(e.target.files[0])} ></input>


       
    </div>


    <div className={`z-40 ${vis2} bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 flex flex-col items-center`} id="p-bar">

      <span onClick={func1}>fd</span>
      <span onClick={func2}>f</span>
      <span onClick={func3}>f</span>
      <span onClick={func4}>f</span>
    </div>


    <div className={`z-40 ${vis3} bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 flex flex-col items-center`} id="c-bar">
     
    </div>



    
    </div>

    <div id="div-bar"></div>
  
   
    </>
  );
}

export default Bar;
