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
            const { id } = jwt.verify(value, coreConfigurationsConst.privateKey);
            if (id) {
                const [ validateUser ] = await userQuery.findUserQuery({
                    where: { id, state: true }
                });
                req.body.user = validateUser;  
                req.body.isValidToken = validateUser? true:false;
            }
        } catch {
            req.body.user = false;
            req.body.isValidToken = false;
        }
    },
    validatePassword: async (value, password, req) => {
        req.body.validPassword = await bcryptjs.compareSync(value, password);
    }
}