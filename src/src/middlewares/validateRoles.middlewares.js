const { MessageErrors } = require("../models");
const errors = require("../errors/errors.json");
const { responseError } = require("../errors/response");

const isRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
        return responseError(res, 500, errors.user.verifyRole);
        };

        const messageErr = errors.user.allowedRoles
        messageErr.message += roles.join(', ')

        if (!roles.includes(req.user.role)) {
        return responseError(res, 401, messageErr);
        };

        next();
    }
};

module.exports = {
    isRole
}