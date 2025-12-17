import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { BiMessage } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    useEffect(() => {
        //cleanup function (unmounts)
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])
    
	return (
		// <div className='md:min-w-[450px] overflow-x-scroll flex flex-col'>
        //     {!selectedConversation ? <NoChatSelected /> : ( 
        //     <div>
		// 		{/* Header */}
		// 		<div className='bg-slate-500 px-4 py-2 mb-2'>
		// 			<span className='label-text'>To:</span> <span className='text-white border-2 border-blue-500 rounded-full px-2 font-bold'>{selectedConversation.fullname}</span>
		// 		</div>
		// 		<Messages />
		// 		<MessageInput />
		// 	</div>
        //     )}
		// </div>
		<div className='flex flex-col w-full md:min-w-[450px] h-full'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
				{/* Header: Fixed height, no shrinking */}
				<div className='bg-slate-500 px-4 py-2 flex items-center gap-2 flex-none'>
					<span className='label-text text-gray-200'>To:</span>{" "}
					<span className='text-white border-2 border-blue-400 rounded-full px-3 py-0.5 text-sm font-bold'>
					{selectedConversation.fullname}
					</span>
				</div>

				{/* Messages Area: This is the only part that should scroll */}
				<div className='flex-1 overflow-y-auto overflow-x-hidden px-4'>
					<Messages />
				</div>

				{/* Input Area: Fixed at the bottom */}
				<div className='p-4 flex-none'>
					<MessageInput />
				</div>
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
    const {authUser} = useAuthContext()
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullname}❄</p>
				<p>Select a chat to start messaging</p>
				<BiMessage className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};