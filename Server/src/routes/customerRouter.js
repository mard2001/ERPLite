import express from "express";
import { getAllCustomers } from "../controller/customerController.js";


const customerRouter = express.Router();

customerRouter.get('/getallcustomers', getAllCustomers);


export default customerRouter;