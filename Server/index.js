import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import authRouter from './src/routes/authRouter.js';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/userRouter.js';
import customerRouter from './src/routes/customerRouter.js';
import companyRouter from './src/routes/companyRouter.js';
import supplierRouter from './src/routes/supplierRouter.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/supplier", supplierRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log('SERVER WORKING AND LISTENING TO PORT: ' + process.env.SERVER_PORT)
})