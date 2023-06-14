// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Observation } = require('../index.models');

// Helper
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {
    createObservationQuery: async (where) => {
        try {
            return await Observation.findOrCreate({ where })
        } catch {
            throw errorsConst.observationErrors.queryErrors.createError;
        }
    },
    findObservationQuery: async (query = {}) => {
        try {
        } catch {
        }
    }
}