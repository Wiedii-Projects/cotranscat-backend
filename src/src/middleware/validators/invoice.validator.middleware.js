// Queries
const { invoiceQuery } = require('../../models/index.queries');
const ticketQuery = require('../../models/ticket/ticket.query');

module.exports = {
    validateInvoiceTravel: async (where, req) => {
        try {
            let [invoice, tickets] = await Promise.all([
                invoiceQuery.findInvoiceTravelQuery({ where }),
                ticketQuery.findAllTicketQuery({ where: { idInvoice: where.id} })
            ]);
            invoice.tickets = tickets;
            req.body.invoice = invoice;
        } catch {
            req.body.invoice = false;
        }
    },
    validateInvoiceMoneyTransfer: async (where, req) => {
        try {
            let [invoice, tickets] = await Promise.all([
                invoiceQuery.findInvoiceTravelQuery({ where }),
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

