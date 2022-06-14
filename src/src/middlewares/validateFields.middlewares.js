const { validationResult } = require("express-validator");
const { responseAllError } = require("../errors/response");

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return responseAllError(res, 400, errors);
    }
    next();
}

module.exports = {
    validateFields
}