import { Router } from "express";
import User from "../models/user.js";

const UserRouter = Router();


UserRouter.get("/details", async (req, res) => {
    try 
    {
        console.log(req.user);
        const user = {
            username: req.user.username,
            email: req.user.email,
            imageUrl: req.user.imageUrl
        };

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({user});

    } 
    catch (error) 
    {
        console.log("error happened in user/details route: ",error);
        
    }
});

export default UserRouter;