import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		// <div className='py-2 flex flex-col overflow-auto'>
		// 	{conversations.map((conversation, idx) => (
		// 		<Conversation
		// 			key={conversation._id}
		// 			conversation={conversation}
		// 			emoji={getRandomEmoji()}
		// 			lastIdx={idx === conversations.length - 1}
		// 		/>
		// 	))}

		// 	{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		// </div>
		<div className='flex-1 flex flex-col overflow-y-auto pr-2 custom-scrollbar gap-1'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading && (
				<div className='flex justify-center w-full py-4'>
					<span className='loading loading-spinner loading-md text-primary'></span>
				</div>
			)}
			
			{!loading && conversations.length === 0 && (
				<div className="text-center text-slate-500 mt-10 text-sm">
					No conversations yet. Start a chat!
				</div>
			)}
		</div>
	);
};
export default Conversations;