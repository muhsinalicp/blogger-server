import {Router} from "express";
import getAllBlogs from "../controllers/getBlogsController.js";
import getDynamicBlog from "../controllers/getDynamicBlogs.js"


const homeRouter = Router();


homeRouter.get("/blogs",getAllBlogs,);

homeRouter.get('/blog/:bid',getDynamicBlog)


export default homeRouter;

