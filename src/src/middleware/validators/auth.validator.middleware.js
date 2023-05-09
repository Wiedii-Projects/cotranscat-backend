// Constants
const { coreConfigurationsConst } = require('../../constants/index.constants');

// Libraries
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Queries
const { userQuery } = require('./../../models/index.queries');

//Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');
module.exports = {
    validateJWT: async (value, req) => {

        try {
            const { id: uuid } = jwt.verify(value, coreConfigurationsConst.privateKey);
            const id = sharedHelpers.decryptIdDataBase(uuid)
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
    validatePassword: async(value, password, req) => {
        req.body.passwordCompare = await bcryptjs.compareSync(value, password);
    }
}