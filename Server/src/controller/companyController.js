import { db } from "../connect.js";
import { getCurrentTimestamp } from "../utils/calculate.js";
import { generateBranchID } from "../utils/codeGenerator.js";
import * as response from "../utils/response.js";

export const createCompanyDetails = (req, res) => {
    const { branchName, branchRegion, branchProvince, branchMunicipality, branchAddress } = req.body;

    const query = "SELECT * FROM tbl_company WHERE branchName = ?";

    db.query(query, [branchName], (err,data) => {
        if(err) return response.serverError(res, 'Database error', err);
        if(data.length > 0) return response.conflict(res, 'Branch Name already exist.');

        const insertSql = "INSERT INTO `tbl_company`(`branchID`, `branchName`, `branchRegion`, `branchProvince`, `branchMunicipality`, `branchAddress`, `updatedAt`, `createdAt`) VALUES (?,?,?,?,?,?,?,?)";
        const branchID = generateBranchID();
        const insertValues = [
            branchID,
            branchName,
            branchRegion,
            branchProvince,
            branchMunicipality,
            branchAddress, 
            getCurrentTimestamp(), 
            getCurrentTimestamp()
        ];

        db.query(insertSql, insertValues, (err, data) => {
            if(err) return response.serverError(res, 'Database error', err);

            return response.ok(res, "New branch successfully added.", data);
        })
    })
}

export const updateCompanyDetails = (req, res) => {
    const { branchID, ...fields } = req.body; 
    const columns = Object.keys(fields)
        .map(key => `${key} = ?`)
        .join(', ');


    const values = Object.values(fields);
    if (!columns.length) return response.badRequest(res, "No fields provided to update.");

    const query = `UPDATE tbl_company SET ${columns}, updatedAt = ? WHERE branchID = ?`;

    db.query(query,[...values, getCurrentTimestamp(), branchID], (err, data) => {
        if(err) return response.serverError(res, "Database error", err);

        return (data.affectedRows > 0)?
            response.ok(res, 'Branch details successfully updated.'):
            response.notFound(res, 'Branch not found');
    })
};
