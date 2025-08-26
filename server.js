import express from "express";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.use('/', (req, res) => {
    res.json({success:true , message: "API IS WORKING"});
})

app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`));
