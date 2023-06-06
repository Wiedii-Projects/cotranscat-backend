// Helpers
const { responseHelpers } = require('../helpers/index.helpers');
const { createNewInvoiceQuery } = require('../models/invoice/invoice.query');
const { createNewTicketQuery } = require('../models/ticket/ticket.query');

module.exports = {
    createInvoice: async(req, res) => {
        try {
            return responseHelpers.responseSuccess(res, null);
        } catch (error){
            return responseHelpers.responseError(res, 500, error);
        }
    }
}