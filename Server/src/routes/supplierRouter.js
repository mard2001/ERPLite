import express from "express";
import { allSuppliers, createSupplier, updateSupplierDetails } from "../controller/supplierController.js";
import { validateBody } from "../middleware/valuesValidator.js";


const supplierRouter = express.Router();

supplierRouter.get('/getallsuppliers', allSuppliers);
supplierRouter.post(
    '/addsupplier', 
    validateBody(['supplierName', 'contactPerson', 'phone', 'address1', 'address2', 'address3', 'address4']),
    createSupplier
);
supplierRouter.post(
    '/updatesupplierdetails',
    validateBody(['supplierID']),
    updateSupplierDetails
)

export default supplierRouter;







