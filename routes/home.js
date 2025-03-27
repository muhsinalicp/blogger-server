import { Router } from "express";
import getAllBlogs from "../controllers/getBlogsController.js";
import getDynamicBlog from "../controllers/getDynamicBlogs.js";
import getAuthorController from "../controllers/getAuthorController.js";

const homeRouter = Router();

homeRouter.get("/blogs", getAllBlogs);

homeRouter.get("/blog/:bid", getDynamicBlog);

homeRouter.get("/getauthors", getAuthorController);

export default homeRouter;
