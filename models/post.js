import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title:
  {
    type: String,
    required: true
  },
  content:
  {
    type: String,
    required: true
  },
  blog:
  {
    type: String,
    required: true
  },
  location:
  {
    type: String,
    required: true
  },
  image:
  {
    type: String,
    required: true
  },
  author:
  {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true });

const Post = model("Post", PostSchema);

export default Post;