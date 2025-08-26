// feature: 
// login
// register
// is auth -> cek apakah masih login (setelah close web)

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// post /api/user/login
export const login = async (req, res ) => {
    try {
        // loginId bisa berupa email / username
        const {loginId , password} = req.body;
        if(!loginId || !password){
            return res.json({success:false, message:"Missing required data"});
        }
        const user = await User.findOne({
            $or: [
                {username: loginId},
                {email: loginId}
            ]
        })

        if(!user){
            return res.json({success:false, message: "No user in database"});
        }
        const verified = await bcrypt.compare(password, user.password);
        if(!verified){
            return res.json({success:false, message: "Invalid Password"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            maxAge: 3 * 24 * 60 * 60 * 1000 
        });
        res.json({success:true, user: {username: user.username , email: user.email}});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
};

// POST api/user/register
export const register = async (req, res) => {
    try {
        const {username , email, password} = req.body;
        if(!username || !email || !password){
            return res.json({success:false, message:" Missing Invalid Data "});
        }

        const userExist = await User.findOne({
            $or:[
                {username},
                {email}
            ]
        });

        if(userExist){
            return res.json({success:false, message:"User already exist"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashPassword
        });
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '3d'});
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.json({success:true, user: {username: user.username, email :user.email}});

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}


export const isAuth = async (req, res) => {
    try {
        const {userId} = req;
        const user = await User.findById(userId);
        res.json({success:true, user: {username: user.username , email : user.email}});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

