// Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

// Queries
const { userQuery, documentTypeQuery, indicativeNumberQuery, roleQuery, municipalityQuery } = require('./../../models/index.queries')

module.exports = {
    validateGetUser: async (value, req) => {
        try {
            const [user] = await userQuery.findUserQuery(value);
            const {
                id,
                UserDriver,
                UserAdmin,
                UserCoordinator,
                UserSeller,
                UserRole,
                UserDocumentType, 
                UserIndicativePhone,
                ...userData
              } = user

              const userAllData = {
                id: sharedHelpers.encryptIdDataBase(id),
                role: {
                  id: sharedHelpers.encryptIdDataBase(UserRole.id),
                },
                documentType: {
                  ...UserDocumentType,
                  id: sharedHelpers.encryptIdDataBase(UserDocumentType.id),
                },
                indicativeNumber: {
                  ...UserIndicativePhone,
                  id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id),
                },
                ...userData
              }

            req.body.user = userAllData;
        } catch {
            req.body.user = false;
        }
    },
    validatePasswordRules: async (password = '', req) => {
        req.body.isValidPassword = !(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/) === null);
    },
    validateIdDocumentType: async (value, req) => {
        try {
            const [isValid] = await documentTypeQuery.findDocumentTypes(value);
            req.body.isValid = isValid;
        } catch {
            req.body.isValid = false;
        }
    },
    decryptId: async (value, data, req) => {
        try {
            req.body[data] = sharedHelpers.decryptIdDataBase(value);
        } catch {
            req.body[data] = false;
        }
    },
    validateIdIndicativeNumber: async (value, req) => {
        try {
            const [isValid] = await indicativeNumberQuery.findIndicativeNumberQuery(value);
            req.body.isValid = isValid;
        } catch {
            req.body.isValid = false;
        }
    },
    validateIdMunicipality: async (value, req) => {
        try {
            const [isValid] = await municipalityQuery.findMunicipalityQuery(value);
            req.body.isValid = isValid;
        } catch {
            req.body.isValid = false;
        }
    },
    validateIdRole: async (value, req) => {
        try {
            const [isValid] = await roleQuery.findRoleQuery(value);
            req.body.isValid = isValid? true:false;
        } catch {
            req.body.isValid = false;
        }
    }
}