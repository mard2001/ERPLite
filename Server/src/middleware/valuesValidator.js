import { validateRequiredFields } from "../utils/validator.js";
import * as response from "../utils/response.js";


export const validateBody = (requiredFields) => (req, res, next) => {
    const { isValid, missingFields } = validateRequiredFields(req.body, requiredFields);

    if (!isValid) return response.badRequest(res, "Missing or invalid required fields.", {
        required: requiredFields,
        missing: missingFields
    });

    next();
};