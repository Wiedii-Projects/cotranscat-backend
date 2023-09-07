// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { PhotoDocumentOwner } = require('../index.models');

module.exports = {
    createPhotoDocumentOwnerQuery: async (where) => {
        try {
            return await PhotoDocumentOwner.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.photoDocumentOwnerErrors.queryErrors.createError
        }
    },

    findPhotoDocumentOwnerQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await PhotoDocumentOwner.findAll({
                where,
                raw: true
            }).then(photoDocumentOwner => photoDocumentOwner.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.photoDocumentOwnerErrors.queryErrors.findAllError
        }
    },

    updatePhotoDocumentOwnerQuery: async (where, update) => {
        try {
            return await PhotoDocumentOwner.update(update, { where });
        } catch {
            throw errorsConst.photoDocumentOwnerErrors.queryErrors.updateError
        }
    },

    deletePhotoDocumentOwnerQuery: async (where) => {
        try {
            return await PhotoDocumentOwner.destroy({ where })
        } catch {
            throw errorsConst.photoDocumentOwnerErrors.queryErrors.deleteError
        }
    }
}