import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3Client.js";
import Post from "../models/post.js";





const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };


  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (err) {
    console.error('Error uploading to S3:', err);
    throw err;
  }
};


export async function createBlogController(req, res) {
  try {
    const { blogtitle, location, description , blog } = req.body;
    const { _id } = req.user

    if (!blogtitle || !location || !description || !blog) return res.status(401).json({ message: "all fields are required" })

    if (!req.file) return res.status(401).json({ message: "image is required" })

    const imageurl = await uploadToS3(req.file);

    let blogobj =
    {
      title: blogtitle,
      content: description,
      location, location,
      image: imageurl,
      blog: blog,
      author: _id,
    }
    const blogmodel = await Post.create(blogobj);

    if (!blogmodel) return res.status(500).json({ message: "error occured while creating blog, please try again" });

    return res.status(200).json({ message: "Blog created successfully " });
  } catch (error) {
    console.log("error occured in bloggercontroller:", error);

  }
}