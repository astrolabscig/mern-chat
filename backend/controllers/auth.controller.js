import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords don't match"})
        }
        
        const user = await User.findOne({username});
        
        if(user) {
            return res.status(400).json({error: "Username already exists"})
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfileImg =  `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfileImg =  `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profile_img: gender === "male" ? boyProfileImg : girlProfileImg
        })

        if(newUser) {
            // Generate JWT token
            await generateTokenAndSetCookie(newUser._id, res);
            // save User to dbs
            await newUser.save();

            return res.status(200).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profile_img: newUser.profile_img
            })
        }



    } catch (error) {
        console.log("Error in signup controller: ", error.message)
        return res.status(500).json({error: "Internal server error"})
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({ erro: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profile_img: user.profile_img,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully "});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
};