// Helpers
const { responseHelpers, userHelpers, sharedHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { clientQuery, userQuery, roleQuery } = require('../models/index.queries');


module.exports = {
    createClient: async (req, res) => {
        const { email = null, address = null, idMunicipality = null } = req.body;
        const extractUser = userHelpers.extractUserDataHelper(req.body);
        const extractClient = userHelpers.extractClientDataHelper({...req.body, email, address, idMunicipality});
        try {
            const [{id: idRole}] = await roleQuery.findRoleQuery({ role: "CLIENT_ROLE" });
            const [userAlreadyExists] = await userQuery.findUserQuery({ 
                where: {
                    idDocumentType: extractUser.idDocumentType, 
                    numberDocument: extractUser.numberDocument, 
                    idRole
                } 
            });
            
            if(!userAlreadyExists?.id){
                let transaction = await sharedHelpers.initTransaction();
                const [user] = await userQuery.createNewUserQuery({...extractUser, idRole}, transaction);
                await clientQuery.createClientQuery({...extractClient, id: user.id}, transaction);
                await transaction.commit();
                return responseHelpers.responseSuccess(res, null);
            }
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllClient: async (req, res) => {
        try {
            const resp = await clientQuery.findClientQuery();
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
}