import { db } from "../connect.js";
import * as response from "../utils/response.js";

export const getAllCustomers = (req, res) => {
    const query = "SELECT * FROM tbl_customer";

    db.query(query, (err, data) => {
        if(err) return response.serverError(res, "Database error", err);

        return (data.length > 0)?
            response.ok(res, 'All Customers successfully retrieved.', data):
            response.ok(res, 'No customers found');
    })
}