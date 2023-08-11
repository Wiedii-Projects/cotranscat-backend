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
    validateInvoiceExist: async (where, req) => {
        try {
            let invoice = await invoiceQuery.findInvoiceQuery({ where });
            req.body.invoice = invoice.id? where.id:false;
        } catch {
            req.body.invoice = false;
        }
    },
    validateInvoiceIsCancelled: async (where, req) => {
        try {
            req.body.isCancelledInvoice = false
            req.body.invoice = await invoiceQuery.findInvoiceQuery({ where });

            if (req.body.invoice && req.body.invoice.isCancelled === 0) req.body.isCancelledInvoice = true
        } catch {
            req.body.invoice = false;
        }
    },
    validateInvoiceIsElectronic: async (where, req) => {
        try {
            req.body.isCancelledInvoice = false
            const invoice = await invoiceQuery.findInvoiceElectronicQuery({ where });
            req.body.isInvoiceElectronic = invoice.isElectronic === 1 ? true : false;
        } catch {
            req.body.isInvoiceElectronic = false;
        }
    }
}

