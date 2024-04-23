import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import "../home/Home.css"


const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const [img, setImg] = useState("https://p1.hiclipart.com/preview/677/263/683/picsart-background-png-clipart-thumbnail.jpg");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	const changefunc=(e)=>{
		setUsername(e.target.value);
		setImg("https://yt3.googleusercontent.com/ytc/AMLnZu_nYkAg5iRLGjNXvl8pDWF1Y8k3PeS_Uxx41HIzrg=s900-c-k-c0x00ffffff-no-rj");
	}
	const changefunc2=(e)=>{
		setPassword(e.target.value);
		setImg("https://i.pinimg.com/originals/fe/50/57/fe505767d21dc76ea025bb72a0a08f33.jpg")
	}


	return (
		<div className='flex flex-col items-center justify-center w-full text-black' id="div2">
			<div className='w-6/12 p-6 rounded-lg shadow-md bg-black' id="log-div">
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>
          <div className="flex flex-col mt-2 mb-7 items-center ">
               <div className="h-28 w-28 rounded-full bg-slate-100 m-auto mt-5 text-lg"><img src={img} className="rounded-full h-28 "></img></div>
			   <p className="font-bold text-blue-700">Welcome <span className="text-white text-lg font-bold"> Back</span></p>
			   </div>
				<form onSubmit={handleSubmit}>
					<div className="text-black">
						<label className='label p-2'>
							<span className='text-base label-text text-white font-bold'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10 rounded-2xl text-white'
							value={username}
							onChange={changefunc}
							
						/>
					</div>

					<div>
						<label className='label '>
							<span className='text-base label-text text-white font-bold'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10 rounded-2xl text-white'
							value={password}
							onChange={changefunc2}
						/>
					</div>
					<Link to='/signup' className='text-sm text-red-500 hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div className="flex justify-center">
						<button className='btn btn-block btn-sm mt-2 w-5/6 bg-blue-800	rounded-xl' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
