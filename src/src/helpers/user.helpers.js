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
    extractUserDataHelper: ({ idDocumentType, numberDocument, name, lastName, idIndicativePhone, numberPhone }) => ({ idDocumentType, numberDocument, name, lastName, idIndicativePhone, numberPhone }),
    extractOwnerDataHelper: ({ numberPhoneWhatsapp, address, email, idMunicipalityOfResidence, idIndicativePhoneWhatsApp }) => ({ numberPhoneWhatsapp, address, email, idMunicipalityOfResidence, idIndicativePhoneWhatsApp }),
    extractClientDataHelper: ({ idMunicipality, idIndicativePhoneWhatsApp, numberPhoneWhatsapp, email, address }) => ({ idMunicipality, idIndicativePhoneWhatsApp, numberPhoneWhatsapp, email, address }),
    extractDriverDataHelper: ({ 
        nickName, 
        email, 
        password,
        dateOfBirth,
        address,
        licenseNumber,
        dateOfLicenseIssuance,
        dateExpirationLicense,
        transitAgency,
        restriction,
        licensePhoto = "",  
        idMunicipalityOfBirth,
        idMunicipalityOfResidence,
        idBloodType,
        idLicenseCategory
    }) => ({ 
        nickName, 
        email, 
        password,
        dateOfBirth,
        address,
        licenseNumber,
        dateOfLicenseIssuance,
        dateExpirationLicense,
        transitAgency,
        restriction,
        licensePhoto, 
        idMunicipalityOfBirth,
        idMunicipalityOfResidence,
        idBloodType,
        idLicenseCategory
    }),
    extractCoordinatorDataHelper: ({ nickName, email, password }) => ({ nickName, email, password }),
    extractAdminDataHelper: ({ nickName, email, password }) => ({ nickName, email, password }),
    extractSellerDataHelper: ({ nickName, email, password }) => ({ nickName, email, password }),
}