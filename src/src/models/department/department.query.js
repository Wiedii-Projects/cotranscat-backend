// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Department } = require('../index.models');

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

module.exports = {
    createDepartmentQuery: async (name) => {
        try {
            return await Department.findOrCreate({
                where: { name }
            });
        } catch {
            throw errorsConst.department.queryErrors.createError
        }
    },
    findDepartment: async (query = {}) => {
        try {
            const { where } = query;
            return await Department.findAll({
                where,
                raw: true
            }).then(departments => departments.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.department.queryErrors.findAllError
        }
    },
    updateDepartmentQuery: async (where, update) => {
        try {
            return await Department.update(update, { where });
        } catch {
            throw errorsConst.department.queryErrors.updateError
        }
    },
    deleteDepartmentQuery: async (where) => {
        try {
            return await Department.destroy({ where })
        } catch {
            throw errorsConst.department.queryErrors.deleteError
        }
    }
}