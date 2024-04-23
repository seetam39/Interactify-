import React from 'react';

function Bluebtn(onClick) {
  return (
    <div>
       <button onClick={onClick} style={{ margin: '20px' }} className='h-10 w-10 rounded-full bg-blue-700'>
      blue
    </button>
    </div>
  );
}

export default Bluebtn;
