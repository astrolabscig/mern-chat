import { useContext } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
	const {authUser} = useContext(AuthContext);
	return (
		// <div className='border-r border-slate-500 p-4 flex flex-col'>
		// 	 <div className='bg-blue-900 text-white top-0 p-3 rounded-full z-100 mb-5 text-center'>USER: {authUser.fullname}</div>
		// 	<SearchInput />
		// 	<div className='divider px-3'></div>
		// 	<Conversations />
		// 	<LogoutButton />
		// </div>

	<div className='flex flex-col w-full md:w-80 h-full border-r border-slate-200 bg-slate-50/50 p-4 transition-all'>
    {/* User Profile Header */}
    <div className='flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-6'>
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {authUser.fullname.charAt(0)}
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Signed in as</span>
            <span className='text-sm font-semibold text-slate-800 truncate'>{authUser.fullname}</span>
        </div>
    </div>

    <SearchInput />
    
    <div className='h-[1px] bg-slate-200 my-4 mx-2'></div>

    {/* Conversations Area - Scrollable */}
    <div className='flex-1 overflow-y-auto custom-scrollbar'>
        <Conversations />
    </div>

    {/* Footer Area */}
    <div className='mt-auto pt-4 border-t border-slate-200'>
        <LogoutButton />
    </div>
    </div>
	);
};
export default Sidebar;