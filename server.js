import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./route/userRoute.js";
import goalRoute from "./route/goalRoute.js";

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());

await connectDB();


app.get('/', (req, res) => {
    res.json({success:true , message: "API IS WORKING"});
})
app.use('/api/user', userRoute);
app.use('/api/goal', goalRoute);


app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`));
