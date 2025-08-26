
import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next ) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.json({success:false, message: "Missing required Token"});
        }
    
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(verified.id){
            console.log(verified.id);
            req.userId = verified.id;
            next();
        }else{
            return res.json({success:false, message: "Invalid Token"});
        }
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}