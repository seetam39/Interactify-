import React from 'react';

function Pinkbtn(onClick) {
  return (
    <div>
          <div>
       <button onClick={onClick} style={{ margin: '20px' }} className='h-10 w-10 rounded-full bg-pink-700'>
      pink
    </button>
    </div>
    </div>
  );
}

export default Pinkbtn;
