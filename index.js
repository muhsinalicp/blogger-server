import "dotenv/config";
import express from "express";
import cors from "cors";
import  {connectDB}  from "./connection.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.js";
const app = express();
const PORT = process.env.PORT || 9000;


app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(cookieParser());

connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
    res.json({ message: "Hello from server" });
})


app.use("/auth", AuthRouter);





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));