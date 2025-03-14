import User from "../models/user.js";
import jwt from "jsonwebtoken";


export async function authMiddleware(req, res, next) 
{
    try 
    {
        const token = req.cookies.token;
        
        if(!token) return res.status(401).json({message: "Unauthorized"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user) return res.status(401).json({message: "No user found"});

        req.user = user;
        next();
    }
    catch (error) 
    {
        console.log("error happened in authMiddleware route: ",error); 
    }
}