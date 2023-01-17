// Helpers
const responseHelpers = require('./../../helpers/response.helpers')

// Libraries
const { validationResult } = require("express-validator");

module.exports = {
    validateFields: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseHelpers.responseAllError(res, 400, errors.errors[0].msg);
        }
        next();
    }
}