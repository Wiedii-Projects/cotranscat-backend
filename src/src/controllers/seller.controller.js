// Helpers
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');
const indexHelpers = require('../helpers/index.helpers');
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { roleQuery, userQuery, sellerQuery } = require('../models/index.queries');


module.exports = {
    createSeller: async (req, res) => {
        const userExtract = indexHelpers.userHelpers.extractUserDataHelper(req.body)
        const {password, ...seller} = indexHelpers.userHelpers.extractSellerDataHelper(req.body)
        let transaction;
        try {
            transaction = await dbConnectionOptions.transaction();
            //TODO Adjust Role
            const [role] = await roleQuery.findRoleQuery({role: "SELLER_ROLE"})
            const [user] = await userQuery.createNewUserQuery( {...userExtract, idRole: role.id}, transaction)
            await sellerQuery.createSellerQuery(
              {
                ...seller,
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

    getAllSeller: async (req, res) => {
        try {
            const resp = await sellerQuery.findSellerQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getSeller: async (req, res) => {
        const { decryptId } = req.body;
        try {
            const resp = await sellerQuery.findSellerQuery(decryptId)
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

}