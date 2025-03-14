import { Router } from "express";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";

const AuthRouter = Router();

AuthRouter.post("/register",registerController);

AuthRouter.post("/login", loginController);

AuthRouter.get("/logout", (req, res) => {
    return res.clearCookie("token").json({ message: "Logged out successfully" });
});




export default AuthRouter;
