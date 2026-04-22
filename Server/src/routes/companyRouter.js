import express from "express";
import { createCompanyDetails, updateCompanyDetails } from "../controller/companyController.js";
import { validateBody } from "../middleware/valuesValidator.js";


const companyRouter = express.Router();

companyRouter.post(
    '/addcompanydetails',
    validateBody(['branchName', 'branchRegion', 'branchProvince', 'branchMunicipality', 'branchAddress']),
    createCompanyDetails
);
companyRouter.post(
    '/updatecompanydetails',
    validateBody(['branchID']),
    updateCompanyDetails
);

export default companyRouter;