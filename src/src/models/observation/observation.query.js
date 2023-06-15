// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Observation, User, Seller } = require('../index.models');

// Helper
const { encryptIdDataBase } = require('../../helpers/shared.helpers');
const Invoice = require('../invoice/invoice.model');

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
            const { where } = query;
            return await Observation.findAll({ 
                where,
                include: [
                    {
                        model: Invoice,
                        as: 'ObservationInvoice',
                        attributes: ['id'],
                        include: [
                            {
                                model: Seller,
                                as: 'InvoiceSeller',
                                attributes: ['id'],
                                include: [
                                    {
                                        model: User,
                                        as: 'UserSeller',
                                        attributes: ['id', 'name', 'lastName'],
                                    }
                                ],
                            }
                        ],
                    }
                ] 
            })
                .then((value) => value.map((result) => ({
                    id: encryptIdDataBase(result.id),
                    description: result.description,
                    date: result.date,
                    name: result.ObservationInvoice.InvoiceSeller.UserSeller.name,
                    lastName: result.ObservationInvoice.InvoiceSeller.UserSeller.lastName,
                })))
        } catch {   
            throw errorsConst.observationErrors.queryErrors.findAllError;
        }
    }
}