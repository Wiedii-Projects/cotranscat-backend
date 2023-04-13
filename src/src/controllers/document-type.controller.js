// Helpers
const { sharedHelpers, responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { documentTypeQuery } = require('../models/index.queries');


module.exports = {
    createDocumentType: async (req, res) => {
        const { name } = req.body;
        try {
            await documentTypeQuery.createNewDocumentTypeQuery(name)
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllDocumentTypes: async (req, res) => {
        try {
            const resp = await documentTypeQuery.findDocumentTypes();
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    updateDocumentType: async (req, res) => {
        const [{ id }, { name }] = [req.params, req.body];
        try {
            await documentTypeQuery.updateDocumentTypeQuery(
                { id: sharedHelpers.decryptIdDataBase(id) },
                { name }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    deleteDocumentType: async (req, res) => {
        const { id } = req.params;
        try {
            await documentTypeQuery.deleteDocumentTypeQuery({ id: sharedHelpers.decryptIdDataBase(id) });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}