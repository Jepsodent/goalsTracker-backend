import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./route/userRoute.js";
import goalRoute from "./route/goalRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

await connectDB();


app.get('/', (req, res) => {
    res.json({success:true , message: "API IS WORKING"});
})
app.use('/api/user', userRoute);
app.use('/api/goal', goalRoute);


app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`));
