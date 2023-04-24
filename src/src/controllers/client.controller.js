// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { clientQuery } = require('../models/index.queries');


module.exports = {
    createClient: async (req, res) => {
        try {
            /* const { nickName, email , password } = req.body;
            clientQuery.createClientQuery({ nickName, email , password: sharedHelpers.decryptIdDataBase(password) }) */
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllClient: async (req, res) => {
        try {
            const resp = await clientQuery.findClientQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    
    updateClient: async (req, res) => {
        const { decryptId , name } = req.body;
        try {
            await clientQuery.updateClientQuery(
                { id: decryptId },
                { name }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    deleteClient: async (req, res) => {
        const { decryptId } = req.body;
        try {
            await clientQuery.deleteClientQuery({ id: decryptId });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}