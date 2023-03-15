// Queries
const { userQuery } = require('./../models/index.queries')

module.exports = {
    createUserModelUserHelper: async (req) => {
        const { name, lastName, email, password, phoneNumber, role } = req.body;
        try {
            return await userQuery.createNewUserQuery({ name, lastName, email, password, phoneNumber, role });
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