import User from "../models/user.js";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginController(req, res) {
  try {
    console.log(req.body);

    const { username, password } = req.body;
    console.log(username, password);

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const userAgent = req.headers["user-agent"] || "";
    const isMobile =
      userAgent.includes("Mobile") ||
      userAgent.includes("Expo") ||
      userAgent.includes("ReactNative");

    if (isMobile) {
      return res.status(200).json({ message: "Login successful", token });
    }

    res.cookie("token", token, {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      httpOnly: true,
      secure: true, // Keep this for HTTPS
      sameSite: "lax", // Change from "none" to "lax"
    });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("error happened in auth/login route: ", error);
  }
}
