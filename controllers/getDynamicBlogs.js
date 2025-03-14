import Post from "../models/post.js";


export default async function getDynamicBlog(req,res)
{
    try 
    {
        const {bid} = req.params;

        if (!bid) return res.status(401).json({message:"parameter isnt provided"});

        const blog = await Post.findOne({_id:bid}).populate("author");
        

        if(!blog) return res.status(401).json({message:`no blog found with id=${bid}`});

        const formattedBlog =
        {
            title:blog.title,
            content:blog.content,
            image:blog.image,
            blog:blog.blog,
            location:blog.location,
            postedAt:new Date(blog.createdAt).toLocaleDateString(),
            author:{name:blog.author.username, image:blog.author.imageUrl}
        }
        res.status(200).json({blog:formattedBlog});
    }
    catch(e)
    {
        console.log("error in getDynamicBlog controller: ",e);
    }  
}