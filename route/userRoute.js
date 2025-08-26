import  express from "express";
import { isAuth, login, register } from "../controllers/userController.js";
import { userAuth } from "../middleware/userAuth.js";


const userRoute = express.Router();

userRoute.post('/login', login);
userRoute.post('/register', register);
userRoute.get('/is-auth', userAuth, isAuth);



export default userRoute;