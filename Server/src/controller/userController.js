import { db } from "../connect.js";
import * as response from '../utils/response.js';
import 'dotenv/config';


export const allUsers = (req, res) => {
    const query =  "SELECT accountID, username, email, userRole, status, firstName, middleName, lastName, suffix, birthDate, age, gender, contactNumber FROM tbl_user_account";

    db.query(query, (err,data) => {
        if (err) return response.serverError(res, 'Database error', err);
        return (data.length > 0)?
            response.ok(res, 'All users successfully retrieved.', data):
            response.ok(res, 'No users found');
    })
}

export const userDetails = (req, res) => {
    const { accountID } = req.params;
    const query =  "SELECT * FROM tbl_user_account WHERE accountID = ?";

    db.query(query, accountID, (err, data) => {
        if (err) return response.serverError(res, 'Database error', err);

        if (data.length === 0) return response.notFound(res, 'User not found');
        
        return response.ok(res, 'User details retrieved', data[0]);
    })
}