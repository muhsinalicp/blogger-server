import "dotenv/config";
import express from "express";
import cors from "cors";
import  {connectDB}  from "./connection.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import BlogRouter from "./routes/blog.js";
import homeRouter from "./routes/home.js";
const app = express();
const PORT = process.env.PORT || 9000;


app.use(express.json());

const corsOptions = {
    origin: process.env.CLIENT_URL, // or an array of allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies/auth headers (if needed)
    maxAge: 86400, // Cache the preflight response for one day
  };

app.use(cors(corsOptions));

app.use(cookieParser());

connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
    res.json({ message: "Hello from server" });
    // res.send("Hello from server")
})


app.use("/auth", AuthRouter);
app.use("/user", homeRouter )

// protected routes
app.use("/user", authMiddleware, UserRouter);
app.use('/blog', authMiddleware, BlogRouter);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));