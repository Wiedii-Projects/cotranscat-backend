// Queries
const { userQuery } = require('./../models/index.queries');

module.exports = {
    createUserModelUserHelper: async (data) => {
        try {
            return await userQuery.createNewUserQuery(data);
        } catch (error) {
            throw error
        }
    },
    extractQueryUserHelper: (query) => {
        const { limitDefault, offsetDefault } = query;
        return {
            limit: (/^[0-9]+$/).test(limitDefault)? parseInt(limitDefault): 10,
            offset: (/^[0-9]+$/).test(offsetDefault)? parseInt(offsetDefault): 0
        }
    },
    extractUserDataHelper: (data) => {
        const {
            idDocumentType = undefined,
            numberDocument = undefined,
            name = undefined, 
            lastName = undefined, 
            idIndicativePhone = undefined, 
            numberPhone = undefined, 
        } = data;
        return { idDocumentType, numberDocument, name, lastName, idIndicativePhone, numberPhone }
    },
    extractCoordinatorDataHelper: (data) => {
        const { 
            nickName = undefined,
            email = undefined,
            password = undefined,
        } = data;
        return { nickName, email, password  }
    },
    extractUserClientDataHelper: (user) => {
        const {
            idDocumentType = undefined,
            numberDocument = undefined,
            name = undefined,
            lastName = undefined,
            idIndicativeNumberPhone = undefined,
            phoneNumber = undefined,
            idIndicativeNumberPhoneWhatsApp = undefined,
            numberPhoneWhatsApp = undefined,
            address = undefined
        } = user;
        return { idDocumentType, numberDocument, name, lastName, idIndicativeNumberPhone, phoneNumber, idIndicativeNumberPhoneWhatsApp, numberPhoneWhatsApp, address };
    }
}