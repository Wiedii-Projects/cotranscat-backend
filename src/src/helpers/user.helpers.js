// Queries
const { userQuery } = require('./../models/index.queries')

module.exports = {
    createUserModelUserHelper: async (data) => {
        try {
            return await userQuery.createNewUserQuery(data);
        } catch (error) {
            throw error
        }
    },
    extractUserDataHelper: (user) => {
        const { 
            name = undefined, 
            lastName = undefined, 
            email = undefined, 
            phoneNumber = undefined, 
            password = undefined, 
            img = undefined, 
            google = false, 
            role = undefined 
        } = user;
        return { name, lastName, email, phoneNumber, password, img, google, role }
    }
}