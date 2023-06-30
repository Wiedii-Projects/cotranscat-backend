// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Resolution } = require("../index.models");

module.exports = {
    createResolutionQuery: async (where, transaction) => {
        try {
            return await Resolution.create(where, { transaction });
        } catch (error) {
            throw errorsConst.resolutionErrors.queryErrors.createError;
        }
    },
    findResolutionQuery: async (query = {}) => {
        const { where } = query;
        try {
            const resolutionFound = await Resolution.findAll({
                where,
                raw: true,
                nest: true
            });
            const resolutions = resolutionFound.map(({ id, idPrefix, idRoute, ...otherDataResolution }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                idPrefix: sharedHelpers.encryptIdDataBase(idPrefix),
                idRoute: sharedHelpers.encryptIdDataBase(idRoute),
                otherDataResolution
            }))
            return resolutions
        } catch {
            throw errorsConst.resolutionErrors.queryErrors.findAllError
        }
    },
}