import React, { useState } from 'react';
import useGetConversations from "../../hooks/useGetConversations";

import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import '../sidebar/Searchinput.css'
import { useAuthContext } from "../../context/AuthContext";
import { ImCross } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { RiUserFill } from "react-icons/ri";




function Search() {
	const [disp, setDisp] = useState("block");

	const clkfunc=()=>{
		setDisp("block")
	}

    const closefunc=()=>{
		setDisp("hidden")

   }


	const { authUser } = useAuthContext();


    const { loading, conversations } = useGetConversations();

  const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
  
  return (
    <>
	
    <div className=' hidden bg-black ' id="inp-cont">
		<div className='h-12 w-12 rounded-full text-3xl border-2 flex justify-center items-center text-blue-800' onClick={clkfunc}><FaUserAlt /></div>
		<div className={`${disp} z-40`} id="prof">
		<button onClick={closefunc} className="absolute top-2 right-2 text-black"><ImCross /></button>

<div className='flex flex-col items-center mt-16 '>
				<div className='h-40 w-40 rounded-full bg-white text-blue-700 text-9xl flex justify-center items-center border-4'><RiUserFill /></div>
		<div className='flex justify-center items-center h-1/2 w-full' >
			<div className='mt-12'>
        <h1 className=' text-2xl mr-2 text-blue-700 font-bold'>Hello 👋👋</h1><br/>
        <p className='text-black font-extrabold text-4xl'>{authUser.fullName}  </p>
		</div>
		</div>
        </div>
		</div>

		
       
        <div>
       <form onSubmit={handleSubmit} className=' gap-1 hidden ' id="search"> 
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full w-3/4 '
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-blue-700 text-white '>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
        </div>
        </div>

		
    </>
  );
}

export default Search;
