import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";


const app = express();
const PORT = process.env.PORT;


app.use(express.json());

await connectDB();


app.get('/', (req, res) => {
    res.json({success:true , message: "API IS WORKING"});
})

app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`));
