import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import "../home/Home.css"


const SignUp = () => {
	const [img, setImg] = useState("https://p1.hiclipart.com/preview/677/263/683/picsart-background-png-clipart-thumbnail.jpg");

	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};
	
	const changefunc=(e)=>{
		setInputs({ ...inputs, username: e.target.value })
		setImg("https://yt3.googleusercontent.com/ytc/AMLnZu_nYkAg5iRLGjNXvl8pDWF1Y8k3PeS_Uxx41HIzrg=s900-c-k-c0x00ffffff-no-rj");
	}
	const changefunc2=(e)=>{
		setInputs({ ...inputs, password: e.target.value })
		setImg("https://i.pinimg.com/originals/fe/50/57/fe505767d21dc76ea025bb72a0a08f33.jpg")
	}


	return (
		<div className='flex flex-col items-center justify-center w-full mx-auto' id="div2">
			<div className='w-6/12 p-6 rounded-lg shadow-md bg-black' id="log-div">
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<div className="flex flex-col mt-2 mb-2 items-center ">
               <div className="h-28 w-28 rounded-full bg-slate-100 m-auto mt-2 text-lg"><img src={img} className="rounded-full h-28 "></img></div>
			   <p className="font-bold text-lg">Create <span className="text-blue-700 text-lg font-bold"> New Account</span></p>
			   </div>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white font-bold'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10  rounded-2xl text-white'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2  '>
							<span className='text-base label-text text-white font-bold'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10  rounded-2xl text-white'
							value={inputs.username}
							onChange={changefunc}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white font-bold'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10  rounded-2xl text-white'
							value={inputs.password}
							onChange={changefunc2}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white font-bold'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10 rounded-2xl text-white'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-red-700'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700 bg-blue-800 rounded-xl' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;