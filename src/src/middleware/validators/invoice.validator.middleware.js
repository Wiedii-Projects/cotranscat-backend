// Queries
const { invoiceQuery } = require('../../models/index.queries');
const ticketQuery = require('../../models/ticket/ticket.query');

module.exports = {
    validateInvoice: async (where, req) => {
        try {
            let [invoice, tickets] = await Promise.all([
                invoiceQuery.findInvoiceQuery({ where }),
                ticketQuery.findAllTicketQuery({ where: { idInvoice: where.id} })
            ]);
            invoice.tickets = tickets;
            req.body.invoice = invoice;
        } catch {
            req.body.invoice = false;
        }
    },
    validateInvoiceExist: async (where, req) => {
        try {
            let invoice = await invoiceQuery.findInvoiceQuery({ where });
            req.body.invoice = invoice.id? where.id:false;
        } catch {
            req.body.invoice = false;
        }
    }
}

