import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const signup = async({fullname, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullname, username, password, confirmPassword, gender});
        if(!success) return ;

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({fullname, username, password, confirmPassword, gender}),
                credentials: 'include' 
            });

            const data = await response.json();
            if(data.error) {
                throw new Error(data.error);
            }

            // localstorage
            localStorage.setItem("chat-user", JSON.stringify(data))
            // context
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }

    }

  return (
    {loading, signup}
  )
}

export default useSignUp


function handleInputErrors({fullname, username, password, confirmPassword, gender}) {
    if(!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields')
        return false
    }

    if(password !== confirmPassword){
        toast.error('Password do not match')
        return false
    }
    
    if(password.length < 6){
        toast.error("Password must be at least 6 characters")
        return false
    }

    return true
}