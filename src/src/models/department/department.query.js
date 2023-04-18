// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Department } = require('../index.models');

// Helpers
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {
    createDepartmentQuery: async (name) => {
        try {
            return await Department.findOrCreate({
                where: { name }
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateDepartment
        }
    },
    findDepartment: async (query = {}) => {
        try {
            const { where } = query;
            return await Department.findAll({
                where,
                raw: true
            }).then(departments => departments.map(({ id, name }) => ({
                id: encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetDepartment
        }
    },
    updateDepartmentQuery: async (where, update) => {
        try {
            return await Department.update(update, { where });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateDepartment
        }
    },
    deleteDepartmentQuery: async (where) => {
        try {
            return await Department.destroy({ where })
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteDepartment
        }
    }
}