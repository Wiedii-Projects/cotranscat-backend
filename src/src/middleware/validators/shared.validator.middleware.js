// Helpers
const { responseHelpers } = require('../../helpers/index.helpers')

// Libraries
const { validationResult } = require("express-validator");

module.exports = {
    validateErrorFields: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseHelpers.responseAllError(res, 400, errors.errors[0].msg);
        }
        next();
    },
    validateError: (req, res, next) => {
        console.log('********************************************************************')
        console.log(validationResult(req));
        console.log('********************************************************************')
        const { errors: [error] } = validationResult(req);
        if (error) return responseHelpers.responseAllError(res, 400, error.msg);
        next();
    } 
}