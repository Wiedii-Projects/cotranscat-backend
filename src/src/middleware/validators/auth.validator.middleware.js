// Constants
const { coreConfigurationsConst } = require('../../constants/index.constants');

// Libraries
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Queries
const { userQuery } = require('./../../models/index.queries')

module.exports = {
    validateJWT: async (value, req) => {

        try {
            const { uid } = jwt.verify(value, coreConfigurationsConst.privateKey);
            if (!uid) {
                req.body.isValidToken = false
                req.body.user = false
            } else {
                req.body.isValidToken = true
                req.body.user = await userQuery.getUserIDQuery(uid);
            }
        } catch (error) {
            req.body.user = false;
            req.body.isValidToken = false
        }
    },
    validatePassword: async (value, password, req) => {
        req.body.validPassword = await bcryptjs.compareSync(value, password);
    }
}