import {hash} from "bcryptjs";
import User from "../models/user.js";

export async function registerController(req, res) {
    try 
    {
        const {username, email, password} = req.body;

        const emailExists = await User.findOne({email});
        if(emailExists) return res.status(400).json({message: "Email already exists"});

        const useNameExists = await User.findOne({username});
        if(useNameExists) return res.status(400).json({message: "Username already exists"});

        const hashedPassword = await hash(password, 10);

        await User.create({username, email, password: hashedPassword});
        return res.status(201).json({message: "User created successfully"});
    }
    catch (error) {
        console.log("error happened in auth/register route: ",error);
        
    }
}