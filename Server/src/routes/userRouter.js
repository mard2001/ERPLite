import express from "express";
import { allUsers, userDetails } from "../controller/userController.js";


const userRouter = express.Router();

userRouter.get('/getalluser', allUsers);
userRouter.get('/userdetails/:accountID', userDetails);

export default userRouter;