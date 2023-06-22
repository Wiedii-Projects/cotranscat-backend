// Queues
const { invoiceSynchronizationJobsQueue } = require("../../connections/queues/sales.queues.connection");

// Queries - Jobs
const {
    getInvoicesDetailsNotSynchronizedJobQuery, updateInvoiceSynchronizedJobQuery
} = require("./../infrastructure/queries/invoice/invoice.query.job");

// Services
const { invoiceServices } = require("../../services/index.services");

module.exports = {
    synchronizeInvoicesStatusPendingJob: async (job) => {
        try {
            const invoicesNotSynchronized = await getInvoicesDetailsNotSynchronizedJobQuery()

            if (invoicesNotSynchronized.length > 0) {
                let invoices = []

                for (const invoiceElement of invoicesNotSynchronized) {
                    const {
                        codeSale, codePrefix, codeTypeService , invoicePrice, invoiceNumber, bankCodePaymentMethod, bankCode, sellerEmail, sellerName,
                        sellerNumberDocument, sellerDocumentType, clientName, clientEmail, clientNumberDocument,
                        clientDocumentType
                    } = invoiceElement

                    invoices.push({
                        numberInvoice: `${invoiceNumber}`,
                        codeSaleInvoice: codeSale,
                        codePrefixInvoice: codePrefix,
                        ivaValueInvoice: 0,
                        client: {
                            documentType: clientDocumentType,
                            nit: clientNumberDocument,
                            name: clientName,
                            email: clientEmail
                        },
                        seller: {
                            documentType: sellerDocumentType,
                            nit: sellerNumberDocument,
                            name: sellerName,
                            email: sellerEmail,
                            bankCode
                        },
                        invoiceDetail: [
                            {
                                code: codeTypeService,
                                price: invoicePrice,
                                quantity: 1
                            }
                        ],
                        invoicePaymentMethodDetail: [
                            {
                                codePaymentMethod: bankCodePaymentMethod,
                                totalValue: invoicePrice
                            }
                        ]
                    })
                }

                if (invoices.length > 0) {
                    const { invoicesRegistered, invoicesFailed } = await invoiceServices.createInvoicesService({ invoices })

                    const filteredInvoices = invoices.filter(invoice => {
                        return invoicesRegistered.some(regInvoice => regInvoice.invoice === invoice.numberInvoice);
                    });

                    const updatePromises = filteredInvoices.map(invoiceToUpdate => {
                        return updateInvoiceSynchronizedJobQuery(
                            { number: invoiceToUpdate.numberInvoice.toString().padStart(8, '0')},
                            { isSynchronized: true }
                        )
                    });

                    Promise.allSettled(updatePromises)
                        .then(results => {
                            const successfulUpdates = [];
                            // TODO: Implement work flow invoices failed updates
                            const failedUpdates = [];

                            results.forEach((result, index) => {
                                if (result.status === 'fulfilled') {
                                    successfulUpdates.push(invoices[index]);
                                } else {
                                    failedUpdates.push(invoices[index]);
                                }
                            });
                        })
                        .catch(() => {
                            // TODO: Implement work flow invoices all failed updates
                        });

                    job.data = {
                        inputJob: invoices,
                        outputJob: { invoicesRegistered, invoicesFailed }
                    }

                    await invoiceSynchronizationJobsQueue.add(job.type, job, job.options);
                }
            }

        } catch {
            // TODO: Create register on redis or log register on local BD
        }
    }
}