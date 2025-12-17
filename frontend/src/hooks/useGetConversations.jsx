import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${backendUrl}/api/users`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                    credentials: 'include' 
                });
                const data = await response.json();
                console.log(data)
                if (data.error){
                    throw new Error(data.error);
                }

                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally{
                setLoading(false)
            }
        };

        getConversations();
    }, [setConversations]);

  return { loading, conversations }
}

export default useGetConversations