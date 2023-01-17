// Constants
const constants = require('./../constants/index')

// Helpers
const authHelpers = require('./auth.helpers')

// Queries
const { userQuery, userGoogleQuery } = require('./../models/index.queries')

module.exports = {
    createUserModelUserHelper: async (req) => {
        const { name, lastName, email, password, phoneNumber, role } = req.body;
        const passwordEncrypt = await authHelpers.encryptPasswordHelper(password);
        return await userQuery.createNewUserQuery({ name, lastName, email, password: passwordEncrypt, phoneNumber, role });
    },
    createUserGoogleHelper: async (req) => {
        const { name, email, picture, google = true, role = constants.roleConst.USER_ROLE } = req.body;
        await userGoogleQuery.createUserQuery({ name, email, picture, google, role });
    },
}