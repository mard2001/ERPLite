import { db } from "../connect.js";
import { getCurrentTimestamp } from "../utils/calculate.js";
import { generateSupplierID } from "../utils/codeGenerator.js";
import * as response from '../utils/response.js';
import 'dotenv/config';


export const allSuppliers = (req,res) => {
    const query =  "SELECT supplierID, supplierName, contactPerson, phone, email, address1, address2, address3, address4, isActive FROM tbl_supplier";

    db.query(query, (err,data) => {
        if(err) return response.serverError(res, "DatabaseError", err);

        return (data.length > 0)?
            response.ok(res, "All Suppliers successfully retrieved.", data):
            response.ok(res, "No supplier registered as of the moment.", data);
    })
}

export const createSupplier = (req,res) => {
    const { supplierName, contactPerson, phone, email, address1, address2, address3, address4 } = req.body;

    const checkquery = "SELECT * FROM tbl_supplier WHERE supplierName = ? AND isActive = 1";

    db.query(checkquery, [supplierName], (err, data) => {
        if(err) return response.serverError(res, "Database error.", err);
        if(data.length > 0) return response.conflict(res, "Supplier already exist.");

        const insertSql = "INSERT INTO `tbl_supplier`( `supplierID`, `supplierName`, `contactPerson`, `phone`, `email`, `address1`, `address2`, `address3`, `address4`, `isActive`, `updatedAt`, `createdAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        const supplierID = generateSupplierID();
        const insertValues = [
            supplierID, supplierName, contactPerson, phone, email, address1, address2, address3, address4, 1, getCurrentTimestamp(), getCurrentTimestamp()
        ]

        db.query(insertSql, insertValues, (err, data) => {
            if(err) return response.serverError(res, 'Database error', err);
            
            return response.ok(res, "New supplier successfully added.", data);
        })
    })
}

export const updateSupplierDetails = (req, res) => {
    const { supplierID, ...fields } = req.body;
    const columns = Object.keys(fields)
        .map(key => `${key} = ?`)
        .join(', ');

    const values = Object.values(fields);
    if(!columns.length) return response.badRequest(res, "No fields provided to update.");

    const query = `UPDATE tbl_supplier SET ${columns}, updatedAt = ? WHERE supplierID = ?`;

    db.query(query, [...values, getCurrentTimestamp(), supplierID], (err, data) => {
        if(err) return response.serverError(res, "Database error", err);

        return (data.affectedRows > 0)?
                    response.ok(res, 'Supplier details successfully updated.'):
                    response.notFound(res, 'Supplier not found');
    })
}