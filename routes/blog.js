import "dotenv/config";
import { Router } from "express";
import { createBlogController } from "../controllers/createblogcontroller.js";
import multer from "multer";
import deleteBlogController from "../controllers/deleteBlogController.js";

const BlogRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

BlogRouter.post("/createblog", upload.single("image"), createBlogController);

BlogRouter.delete("/deleteblog/:bid", deleteBlogController);

export default BlogRouter;
