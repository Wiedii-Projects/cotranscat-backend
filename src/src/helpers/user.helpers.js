// Constants
const constants = require('./../constants/index')

// Helpers
const authHelpers = require('./auth.helpers')

// Queries
const { userQuery, userGoogleQuery } = require('./../models/index.queries')

module.exports = {
    createUserModelUserHelper: async (req) => {
        try {
            const { name, lastName, email, password, phoneNumber, role } = req.body;
            const passwordEncrypt = await authHelpers.encryptPasswordHelper(password);
            return await userQuery.createNewUserQuery({ name, lastName, email, password: passwordEncrypt, phoneNumber, role });
        } catch (error) {
            throw error
        }
    },
    createUserGoogleHelper: async (req) => {
        const { name, email, picture, google = true, role = constants.roleConst.USER_ROLE } = req.body;
        await userGoogleQuery.createUserQuery({ name, email, picture, google, role });
    },
    extractUserDataHelper: (data) => {
        const {
            _id, password, name, email, google, lastName, socialStratification, identificationNumber,
            dateBirth, phoneNumber, ...body
        } = data;
        return {
            _id, password, email, google, name, lastName, socialStratification, identificationNumber,
            dateBirth, phoneNumber
        }
    }
}