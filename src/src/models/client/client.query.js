// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Client } = require('../index.models');

module.exports = {
    createClientQuery: async (where) => {
        try {
            return await Client.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateClient
        }
    },

    findClientQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Client.findAll({
                where,
                raw: true
            }).then(client => client.map(({ id, nickName, email, password }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                nickName,
                email,
                password: sharedHelpers.encryptIdDataBase(password)
            })))
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetClient
        }
    },

    updateClientQuery: async (where, update) => {
        try {
            return await Client.update(update, { where });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateClient
        }
    },

    deleteClientQuery: async (where) => {
        try {
            // return await Client.destroy({ where })
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteClient
        }
    }
}