// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Client, User, DocumentType, IndicativeNumber, Municipality } = require('../index.models');

module.exports = {
    createClientQuery: async (where, transaction) => {
        try {
            return await Client.findOrCreate({ where, transaction });
        } catch {
            throw errorsConst.client.queryErrors.createError;
        }
    },

    findClientQuery: (query = {}) => {
        try {
            const { where } = query;
            return Client.findAll({
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
                    as: "ClientMunicipality"
                }
            ]}).then(clients => clients.map( ({UserClient : {UserDocumentType, UserIndicativePhone, ...user}, ClientIndicativeNumberWhatsApp, ClientMunicipality, id, ...client}) => {
                return {
                    id: sharedHelpers.encryptIdDataBase(id),
                    ...client,
                    ...user,
                    indicativeNumberWhatsApp: {
                        ...ClientIndicativeNumberWhatsApp,
                        id: sharedHelpers.encryptIdDataBase(ClientIndicativeNumberWhatsApp.id)
                    },
                    municipality: ClientMunicipality.id? {
                        ...ClientMunicipality,
                        id: sharedHelpers.encryptIdDataBase(ClientMunicipality.id)
                    } : null,
                    documentType: {
                        ...UserDocumentType,
                        id: sharedHelpers.encryptIdDataBase(UserDocumentType.id)
                    },
                    indicativePhone: {
                        ...UserIndicativePhone,
                        id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id)
                    }
                }
            }))
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