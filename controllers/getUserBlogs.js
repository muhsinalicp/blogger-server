import Post from "../models/post.js";

export default async function getUserBlogs(req, res) 
{
    try 
    {
        const { _id } = req.user;
        if (!_id) return res.status(401).json({ message: "User not found" });
        const userBlogs = await Post.find({ author: _id }).sort({ createdAt: -1 });
        if (!userBlogs) return res.status(200).json({ message: "No blogs found" });
        
        return res.status(200).json({ blog:userBlogs });
    } 
    catch (error) 
    {
        console.log("error occured in getUserBlogs controller: ", error);
    }
}