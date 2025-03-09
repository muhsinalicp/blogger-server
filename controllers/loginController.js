import User from "../models/user.js";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginController(req, res) 
{
    try 
    {
        const {username, password} = req.body;
        console.log(username, password);
        

        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message: "User not found"});

        const isPasswordValid = await compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({message: "Invalid password"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie("token", token, 
            {
                expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
                httpOnly: true, // accessible only by the server
                secure: true, // only sent over HTTPS
                sameSite: "none"
            });

        return res.status(200).json({message: "Login successful"});


    }
    catch (error) 
    {
        console.log("error happened in auth/login route: ",error); 
    }
}