// Constants
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { 
    responseHelpers, sharedHelpers 
} = require('../helpers/index.helpers');
const { encryptIdDataBase } = require('../helpers/shared.helpers');

// Queries
const { createNewInvoiceQuery } = require('../models/invoice/invoice.query');
const { findServiceTypeQuery } = require('../models/service-type/service-type.query');
const { createNewTicketQuery } = require('../models/ticket/ticket.query');
const { invoiceQuery, travelQuery } = require('../models/index.queries');

module.exports = {
    createInvoiceTravel: async(req, res) => {
        let { tickets, idPaymentMethod, decryptId, price, priceSeat, user: { id } } = req.body;
        price = price ? price*tickets.length : priceSeat;
        let transaction;
        try {
            const idSeller = sharedHelpers.decryptIdDataBase(id);
            const [{ id: idServiceType }] = await findServiceTypeQuery({where: { type: 2 }})
            transaction = await dbConnectionOptions.transaction();
            const invoice = await createNewInvoiceQuery({ idClient: decryptId, idServiceType, price, idSeller, idPaymentMethod }, transaction);
            await createNewTicketQuery(tickets, { invoice: invoice.id, price: price/tickets.length, transaction});
            await transaction.commit();
            return responseHelpers.responseSuccess(res, encryptIdDataBase(invoice.id));
        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getInvoice: async(req, res) => {
        try {
            return responseHelpers.responseSuccess(res, req.body.invoice);
        } catch (error){
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllInvoice: async(req, res) => {
        const { page = 0 } = req.query;
        try {
            let [invoice, count] = await Promise.all([
                invoiceQuery.findAllInvoiceQuery({ where: {}, offset: page}),
                invoiceQuery.countInvoiceQuery()
            ]);
            let rows = [];
            for (const value of invoice) {
                const route = await travelQuery.findRouteToTravel({ id: value.idTravel });
                rows.push({
                    ...route,
                    ...value,
                    idTravel: undefined
                })
              }
            return responseHelpers.responseSuccess(res, { count, rows });
        } catch (error){
            return responseHelpers.responseError(res, 500, error);
        }
    }
}