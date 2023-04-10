// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { DocumentType } = require('../index.models');

// Helper
const { encryptIdDataBase } = require('../../helpers/shared.helpers');


module.exports = {
    // TODO: Change names according to the database model
    createNewDocumentTypeQuery: async (name) => {
        try {
            return await DocumentType.findOrCreate({
                where: { document: name }
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateDocumentType
        }
    },
    findDocumentTypes: async (query = {}) => {
        try {
            const { where } = query;
            return await DocumentType.findAll({
                where,
                raw: true
            }).then(documentTypes => documentTypes.map(({ id, document }) => ({
                id: encryptIdDataBase(id),
                document: document
            })))
        } catch (error) {
            throw errorsConst.aggregateErrorsApp.errorGetDocumentType
        }
    },
    updateDocumentTypeQuery: async (where, update) => {
        try {
            return await DocumentType.update(update, { where });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateDocumentType
        }
    },
    deleteDocumentTypeQuery: async (where) => {
        try {
            return await DocumentType.destroy({where})
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteDocumentType
        }
    }
}