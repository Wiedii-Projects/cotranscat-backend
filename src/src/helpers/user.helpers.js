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
    extractUserDataHelper: ({
        idDocumentType,
        numberDocument,
        name,
        lastName,
        idIndicativePhone,
        numberPhone,
    }) => ({ idDocumentType, numberDocument, name, lastName, idIndicativePhone, numberPhone }),
    extractUserClientDataHelper: ({
        idDocumentType,
        numberDocument,
        name,
        lastName,
        idIndicativeNumberPhone,
        phoneNumber,
        idIndicativeNumberPhoneWhatsApp,
        numberPhoneWhatsApp,
        address
    }) => ({ idDocumentType, numberDocument, name, lastName, idIndicativeNumberPhone, phoneNumber, idIndicativeNumberPhoneWhatsApp, numberPhoneWhatsApp, address }),
    extractDriverDataHelper: ({ nickName, email, password }) => ({ nickName, email, password }),
    extractCoordinatorDataHelper: ({ nickName, email, password }) => ({ nickName, email, password }),
}