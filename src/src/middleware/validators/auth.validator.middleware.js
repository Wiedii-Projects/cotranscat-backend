// Configuration environment
const { privateKey } = require('../../config');

// Constants
const { errorsConst } = require('./../../constants/index');

// Helpers
const responseHelpers = require('./../../helpers/response.helpers')

// Libraries
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Models
const { User } = require('../../models/index.models');

module.exports = {
    validateJWT: async (req, res, next) => {
        const token = req.header('x-token');
        if (!token) {
            return responseHelpers.responseError(res, 400, errorsConst.userErrors.noToken);
        };
        try {
            const { uid } = jwt.verify(token, privateKey);
            const user = await User.findById(uid);

            if (!user) {
                return responseHelpers.responseError(res, 400, errorsConst.userErrors.userNotExist);
            };

            if (!user.state) {
                return responseHelpers.responseError(res, 400, errorsConst.userErrors.invalidToken);
            };

            req.user = user;
            next()

        } catch (error) {
            return responseHelpers.responseError(res, 500, errorsConst.userErrors.invalidToken);
        }
    },
    validatePassword: async (value, password, req) => {
        req.body.validPassword = await bcryptjs.compareSync(value, password);
    }
}