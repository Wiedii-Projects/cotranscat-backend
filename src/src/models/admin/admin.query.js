// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Admin } = require('../index.models');

module.exports = {
    createAdminQuery: async (where) => {
        try {
            return await Admin.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateAdmin
        }
    },

    findAdminQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Admin.findAll({
                where,
                raw: true
            }).then(admin => admin.map(({ id, nickName, email, password }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                nickName,
                email,
                password: sharedHelpers.encryptIdDataBase(password)
            })))
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetAdmin
        }
    },

    updateAdminQuery: async (where, update) => {
        try {
            return await Admin.update(update, { where });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateAdmin
        }
    },

    deleteAdminQuery: async (where) => {
        try {
            // return await Admin.destroy({ where })
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteAdmin
        }
    }
}