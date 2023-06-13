// Constants
const { salesConst } = require('../constants/index.constants');

// Helpers
const { 
    responseHelpers, sharedHelpers, clientHelper 
} = require('../helpers/index.helpers');

const { dbConnectionOptions } = require('../constants/core/core-configurations.const');
const { createNewInvoiceQuery } = require('../models/invoice/invoice.query');
const { findServiceTypeQuery } = require('../models/service-type/service-type.query');
const { createNewTicketQuery } = require('../models/ticket/ticket.query');

module.exports = {
    createInvoiceTravel: async(req, res) => {
        let { tickets, idPaymentMethod, decryptId, price, priceSeat, user: { id } } = req.body;
        price = price ? price*tickets.length : priceSeat;
        let transaction;
        try {
            const idSeller = sharedHelpers.decryptIdDataBase(id);
            
            // TODO: In this line we obtain bank details associated to the seller, it is required to use the variable 'codeBank' to register the invoice in API transactional queries.
            const { codeBank, codePaymentMethod, headquarter }  = await clientHelper.getBankByPaymentMethodAssociatedWithTheSellerHelper(id,idPaymentMethod)
            const { codeSale, prefix, code }  = sharedHelpers.getInvoiceRegisterParametersByBankHelper(salesConst.TYPE_SERVICE.PASSAGE, headquarter)

            const [{ id: idServiceType }] = await findServiceTypeQuery({where: { type: 2 }})
            transaction = await dbConnectionOptions.transaction();
            const invoice = await createNewInvoiceQuery({ idClient: decryptId, idServiceType, price, idSeller, idPaymentMethod }, transaction);
            await createNewTicketQuery(tickets, { invoice: invoice.id, price: price/tickets.length, transaction});
            await transaction.commit();
            return responseHelpers.responseSuccess(res, null);
        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    }
}