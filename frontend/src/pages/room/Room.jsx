import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../roomPage/room.css"
function Room() {

    const [value, setValue] = useState();

    const navigate=useNavigate();

    const handleJoinRoom=useCallback(
      () => {
        navigate(`/room/${value}`);
      },
      [navigate,value],
    );

  return (
    <div className='flex flex-col justify-center items-center  ' id="room">
        <input value={value}  onChange={e=> setValue((e).target.value)} type="text" placeholder='Enter room code' className='h-12 w-5/6 mt-20 rounded-lg text-white'></input>
        <button onClick={handleJoinRoom} className='h-11 bg-blue-700 w-2/3  mt-11 rounded-2xl hover:bg-blue-400 transition-all duration-300'>Join</button>
    </div>
  );
}

export default Room;
