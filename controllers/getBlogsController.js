import Post from "../models/post.js";


export default async function getAllBlogs(req ,res) {
    try 
    {
        const allBlogs = await Post.find({}).limit(9).sort({createdAt:-1}).populate("author");
        
        if(!allBlogs) return res.json({message:"no blogs are found"});

        let blogs = allBlogs.map(blog =>
        (
            {
                id:blog._id,
                title:blog.title,
                content:blog.content,
                image:blog.image,
                blog:blog.blog,
                location:blog.location,
                postedAt:new Date(blog.createdAt).toLocaleDateString(),
                author:{name:blog.author.username, image:blog.author.imageUrl}
            }
        )
        )
        
        return res.status(200).json({blogs})
    } 
    catch (error) 
    {
        console.error("error occured in getblogcontroller: ",error); 
    }
}