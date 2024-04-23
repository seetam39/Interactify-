import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
// import './Sidebar.css';

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 w-96 p-4 flex flex-col' id="side">
			<SearchInput/>
			<div className='divider px-3'></div>
			<Conversations />
			{/* <LogoutButton /> */}
		</div>
	);
};
export default Sidebar;