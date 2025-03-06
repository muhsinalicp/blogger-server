import "dotenv/config";
import express from "express";
import cors from "cors";
import  {connectDB}  from "./connection.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.js";
const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB(process.env.MONGO_URI);


app.use("/api/auth", AuthRouter);





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));