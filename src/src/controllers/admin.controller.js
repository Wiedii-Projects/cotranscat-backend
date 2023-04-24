// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { adminQuery } = require('../models/index.queries');


module.exports = {
    createAdmin: async (req, res) => {
        try {
            const { nickName, email , password } = req.body;
            adminQuery.createAdminQuery({ nickName, email , password: sharedHelpers.decryptIdDataBase(password) })
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
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

    deleteAdmin: async (req, res) => {
        const { decryptId } = req.body;
        try {
            await adminQuery.deleteAdminQuery({ id: decryptId });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}