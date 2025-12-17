import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({conversation, lastIndex, emoji}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation === conversation;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""} `}
                onClick={() => setSelectedConversation(conversation)}
            
            >
				<div className='avatar'>
					<div className='w-12 rounded-full relative'>
						<img
							src={conversation.profile_img}
							alt='user avatar'
						/>
					</div>
					{isOnline && <div className="absolute z-100 w-4 h-4 rounded-full bg-green-400"></div>}
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-prime'>{conversation.fullname}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

            {!lastIndex && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;