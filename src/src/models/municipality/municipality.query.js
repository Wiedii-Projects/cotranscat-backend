// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Municipality } = require('../index.models');

module.exports = {
    createMunicipalityQuery: async (where) => {
        try {
            return await Municipality.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateMunicipality
        }
    },

    findMunicipalityQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Municipality.findAll({
                where,
                raw: true
            }).then(municipality => municipality.map(({ id, name, idDepartment }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name,
                idDepartment: sharedHelpers.encryptIdDataBase(idDepartment)
            })))
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetMunicipality
        }
    },

    updateMunicipalityQuery: async (where, update) => {
        try {
            return await Municipality.update(update, { where });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateMunicipality
        }
    },

    deleteMunicipalityQuery: async (where) => {
        try {
            return await Municipality.destroy({ where })
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteMunicipality
        }
    }
}