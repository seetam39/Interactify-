import React from 'react';

function Redbtn(onClick) {
  return (
    <div>
          <div>
       <button onClick={onClick} style={{ margin: '20px' }} className='h-10 w-10 rounded-full bg-red-900'>
      red
    </button>
    </div>
    </div>
  );
}

export default Redbtn;
