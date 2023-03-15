

// Helpers
const authHelpers = require('./auth.helpers')

// Queries
const { userQuery } = require('./../models/index.queries')

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
    extractUserDataHelper: (data) => {
        const {
            id, password, name, email, google, lastName, socialStratification, identificationNumber,
            dateBirth, phoneNumber, ...body
        } = data;
        return {
            id, password, email, google, name, lastName, socialStratification, identificationNumber,
            dateBirth, phoneNumber
        }
    }
}