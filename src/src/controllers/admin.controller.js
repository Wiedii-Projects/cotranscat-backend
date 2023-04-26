// Helpers
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');
const indexHelpers = require('../helpers/index.helpers');
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { adminQuery, roleQuery, userQuery } = require('../models/index.queries');


module.exports = {
    createAdmin: async (req, res) => {
        const userExtract = indexHelpers.userHelpers.extractUserDataHelper(req.body)
        const {password, ...admin} = indexHelpers.userHelpers.extractAdminDataHelper(req.body)
        let transaction;
        try {
            transaction = await dbConnectionOptions.transaction();
            //TODO Adjust Role
            const [role] = await roleQuery.findRoleQuery({role: "ADMIN_ROLE"})
            const [user] = await userQuery.createNewUserQuery( {...userExtract, idRole: role.id}, transaction)
            await adminQuery.createAdminQuery(
              {
                ...admin,
                password: await indexHelpers.authHelpers.encryptPasswordHelper(password),
                id: user.id,
              },
              transaction
            );
            await transaction.commit();
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllAdmin: async (req, res) => {
        try {
            const resp = await adminQuery.findAdminQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAdmin: async (req, res) => {
        const { decryptId } = req.body;
        try {
            const resp = await adminQuery.findAdminQuery(decryptId)
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    
    updateAdmin: async (req, res) => {
        const { decryptId , name } = req.body;
        try {
            await adminQuery.updateAdminQuery(
                { id: decryptId },
                { name }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

}