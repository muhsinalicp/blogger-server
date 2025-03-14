import "dotenv/config";
import { Router } from "express";
import { createBlogController } from "../controllers/createblogcontroller.js";
import multer from "multer";

const BlogRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

BlogRouter.post('/createblog',upload.single("image"), createBlogController);


export default BlogRouter;

