export const validateRequiredFields = (body, requiredFields) => {
    const missingFields = requiredFields.filter(field => {
        const value = body?.[field];
        return value === undefined || value === null || String(value).trim() === '';
    });

    return {
        isValid: missingFields.length === 0,
        missingFields
    };
};