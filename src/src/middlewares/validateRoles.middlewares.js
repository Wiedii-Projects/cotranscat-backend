const { MessageErrors } = require("../models");
const errors = require("../errors/errors.json");

const isRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.user.verifyRole)
            });
        };

        const messageErr = errors.user.allowedRoles
        messageErr.message += roles.join(', ')

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                status: false,
                data: null,
                errors: new MessageErrors(messageErr)
            });
        };

        next();
    }
};

module.exports = {
    isRole
}