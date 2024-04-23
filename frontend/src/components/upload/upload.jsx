import React from 'react';

function upload() {
  return (
    <div className='flex justify-center items-center h-screen '>
    {/* Image Upload Section  */}
    <div className=" bg-[#2C3A47] p-10 rounded-xl">

      {/* Upload Input And Image Section  */}
      <div className="input flex justify-center mb-5">
        <label
          for="file-upload"
          class="custom-file-upload">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
            className="h-20 w-20"
          />
        </label>

       {/* Image Upload Input */}
        <input
          id="file-upload"
          className=' text-white'
          type="file"
        />
      </div>

      {/* Send Button  */}
      <div className="">
        <Button
          className=' w-72 lg:w-96  bg-[#FC427B]'
        >
          Send
        </Button>
      </div>
    </div>
</div>
  );
}

export default upload;
