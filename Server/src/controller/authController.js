import { db } from '../connect.js';
import { generate_UserID } from '../utils/codeGenerator.js';
import * as response from '../utils/response.js';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { calculateAgeFromBirthDate, getCurrentTimestamp } from '../utils/calculate.js';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    if(!req.body) return response.badRequest(res, "Request body is empty", {
        required: ['username', 'password', 'email', 'userRole', 'firstName', 'middleName', 'lastName', 'suffix', 'birthDate', 'gender', 'contactNumber']
    })

    const { username, password, email, userRole, firstName, middleName, lastName, suffix, birthDate, gender, contactNumber } = req.body;
    
    // CHECK USER EXIST
    const query =  "SELECT * FROM tbl_user_account WHERE username = ? OR email = ?";

    db.query(query, [username, email], async (err,data) => {
        if (err) return response.serverError(res, 'Database error', err);
        if (data.length > 0) return response.conflict(res, 'Username or email already exists');

        const userID = generate_UserID(); // GENERATE USER ID
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_KEY_TIMES)); // HASH PASSWORD
        const role = 'ADMIN' // USER ROLE {SUPERADMIN, ADMIN, STAFF, REGULAR, USER}
        const age = calculateAgeFromBirthDate(birthDate); // CALCULATE AGE

        const insertSql = "INSERT INTO tbl_user_account (`accountID`, `username`, `password`, `email`, `userRole`, `status`, `firstName`, `middleName`, `lastName`, `suffix`, `birthDate`, `age`, `gender`, `contactNumber`,`updatedAt`,`createdAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

        const insertValues = [
            userID, username, hashedPassword, email, role, 1, firstName, middleName, lastName, suffix, birthDate, age, gender, contactNumber, getCurrentTimestamp(), getCurrentTimestamp()
        ];

        db.query(insertSql, insertValues, (err, data) => {
            if (err) return response.serverError(res, 'Database error', err);

            return response.ok(res, "USER CREATION SUCCESSFUL", data);
        })
    })
}

export const login = (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, }); // Clearing existing accessToken

    if(!req.body) return response.badRequest(res, "Request body is empty", {
        required: ['username', 'password']
    });

    const { username, password} = req.body;

    const query =  "SELECT * FROM tbl_user_account WHERE username = ?";

    db.query(query, username, (err, data) => {
        if (err) return response.serverError(res, 'Database error', err);
        if (data.length == 0) return response.notFound(res, 'Username does not exists');

        // return response.
        const isPasswordValid = bcrypt.compareSync(password, data[0].password);

        if(!isPasswordValid) return response.conflict(res, 'Password does not match.');
        
        const token = jwt.sign({ id: data[0].accountID }, process.env.SECRET_KEY);

        return response.ok(res, "LOGIN SUCCESSFUL", data, {
            accessToken: {
                value: token,
                options: {
                    httpOnly: true,
                }
            }
        });
    })
}

export const logout = (req, res) => {
    return response.clearCookieResponse(res, 'accessToken', 'LOGOUT SUCCESSFUL', {
        secure: true,
        sameSite: 'none'
    });
}

