// Helpers
const { getBankCodeAssociatedWithTheSeller } = require('../helpers/user/client.helpers');
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');
const { responseHelpers } = require('../helpers/index.helpers');
const { decryptIdDataBase } = require('../helpers/shared.helpers');
const { createNewInvoiceQuery } = require('../models/invoice/invoice.query');
const { findServiceTypeQuery } = require('../models/service-type/service-type.query');
const { createNewTicketQuery } = require('../models/ticket/ticket.query');

module.exports = {
    createInvoiceTravel: async(req, res) => {
        let { tickets, decryptId, price, user: { id } } = req.body;
        let transaction;
        try {
            const idSeller = decryptIdDataBase(id);
            // TODO: In this line we obtain the bank code associated to the seller, it is required to use the variable 'codeBank' to register the invoice in API transactional queries.
            const codeBank = await getBankCodeAssociatedWithTheSeller(idSeller)
            const [{ id: idServiceType }] = await findServiceTypeQuery({where: { type: 2 }})
            transaction = await dbConnectionOptions.transaction();
            const invoice = await createNewInvoiceQuery({ idClient: decryptId, idServiceType, price, idSeller }, transaction);
            await createNewTicketQuery(tickets, invoice.id, transaction);
            await transaction.commit();
            return responseHelpers.responseSuccess(res, null);
        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    }
}