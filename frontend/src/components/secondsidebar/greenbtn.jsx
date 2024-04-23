import React from 'react';

function Greenbtn(onClick) {
  return (
    <div>
          <div>
       <button onClick={onClick} style={{ margin: '20px' }} className='h-10 w-10 rounded-full bg-green-700'>
      green
    </button>
    </div>
    </div>
  );
}

export default Greenbtn;
