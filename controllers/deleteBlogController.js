import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import Post from "../models/post.js";
import s3 from "../config/s3Client.js";
import User from "../models/user.js";

const deleteImage = async (imageUrl) => {
  try {
    // If imageUrl is the full URL (e.g., "https://bucket-name.s3.region.amazonaws.com/uploads/123456_file.png"),
    // extract the key (the part after the domain).
    const url = new URL(imageUrl);
    // url.pathname will be like "/uploads/123456_file.png", so we remove the leading slash:
    const key = url.pathname.substring(1);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  } catch (e) {
    console.log("Error in deleteImage function:", e);
  }
};

export default async function deleteBlogController(req, res) {
  try {
    const { bid } = req.params;

    const { _id } = req.user;

    if (!_id)
      return res
        .status(401)
        .json({ message: "User not found or unauthorized, please try again" });

    const blog = await Post.findById(bid);

    if (!blog) {
      return res.status(401).json({ message: `no blog found with id=${bid}` });
    }

    if (blog.author.toString() !== _id.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this blog" });
    }

    await Post.findByIdAndDelete(bid);

    await User.findByIdAndUpdate(_id, {
      $pull: { blogsCreated: blog._id },
    });

    await deleteImage(blog.image);

    return res.status(200).json({ message: "blog deleted successfully" });
  } catch (e) {
    console.log("error in deleteBlogController controller: ", e);
  }
}
