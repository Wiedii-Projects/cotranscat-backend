// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const {
    Client, User, DocumentType, IndicativeNumber, Municipality, Department
} = require('../index.models');

module.exports = {
    createClientQuery: async (where, transaction) => {
        try {
            return await Client.findOrCreate({ where, transaction });
        } catch {
            throw errorsConst.clientErrors.queryErrors.createError;
        }
    },

    findClientQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Client.findAll({
                where,
                raw: true,
                nest: true,
                attributes: [ 'numberPhoneWhatsapp', 'email', 'address', 'id' ], 
                include: [{
                    model: User,
                    as: 'UserClient',
                    attributes: [ 'numberDocument', 'name', 'lastName', 'numberPhone', 'state' ],
                    include : [{
                        model: DocumentType, 
                        as: "UserDocumentType"
                    }, 
                    {
                        model: IndicativeNumber, 
                        as: "UserIndicativePhone"
                    },
                    {
                        model: IndicativeNumber, 
                        as: "UserIndicativePhone"
                    }]
                },
                {
                    model: IndicativeNumber, 
                    as: "ClientIndicativeNumberWhatsApp"
                },
                {
                    model: Municipality, 
                    as: "ClientMunicipality",
                    include: [{
                        model: Department,
                        as: "MunicipalityDepartment"
                    }]
                }
            ]})
        } catch {
            throw errorsConst.clientErrors.queryErrors.findAllError
        }
    },

    updateClientQuery: async (where, update) => {
        try {
            return await Client.update(update, { where });
        } catch {
            throw errorsConst.clientErrors.queryErrors.updateError
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