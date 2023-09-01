// Constants
const { errorsConst, salesConst } = require("../../constants/index.constants");

// Queues
const { invoiceSynchronizationJobsQueue } = require("../../connections/queues/sales.queues.connection");

// Queries - Jobs
const {
    getInvoicesDetailsNotSynchronizedJobQuery, updateInvoiceSynchronizedJobQuery
} = require("./../infrastructure/queries/invoice/invoice.query.job");

// Services
const { invoiceServices } = require("../../services/index.services");
const { decryptIdDataBase } = require("../../helpers/shared.helpers");

module.exports = {
    synchronizeInvoicesStatusPendingJob: async (job) => {
        try {
            const invoicesNotSynchronized = await getInvoicesDetailsNotSynchronizedJobQuery()

            if (invoicesNotSynchronized.length > 0) {
                let invoices = []

                for (const invoiceElement of invoicesNotSynchronized) {
                    const {
                        key, codeSale, codePrefix, codeTypeService , invoicePrice, invoiceNumber, bankCodePaymentMethod, 
                        bankCode, sellerEmail, sellerName, sellerNumberDocument, sellerDocumentType, 
                        clientName, clientEmail, clientNumberDocument, clientDocumentType, synchronizationType
                    } = invoiceElement

                    const invoice = {
                        key,
                        numberInvoice: `${invoiceNumber}`,
                        codeSaleInvoice: codeSale,
                        codePrefixInvoice: codePrefix
                    }
                    switch (synchronizationType) {
                        case salesConst.TYPE_SYNCHRONIZATION_INVOICES.CREATION_AND_CANCELLATION_INVOICE:
                        case salesConst.TYPE_SYNCHRONIZATION_INVOICES.ONLY_CREATE_INVOICE:
                            invoices.push({
                                processType: synchronizationType,
                                data: {
                                    ...invoice,
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
                                }
                            })
                            break;
                        case salesConst.TYPE_SYNCHRONIZATION_INVOICES.ONLY_CANCEL_INVOICE:
                            invoices.push({
                                processType: salesConst.TYPE_SYNCHRONIZATION_INVOICES.ONLY_CANCEL_INVOICE,
                                data: {
                                    ...invoice
                                }
                            })
                            break;
    
                        default:
                            throw errorsConst.invoiceErrors.processTypeForInvoiceSynchronizationDoesNotExist
                    }

                }
                if (invoices.length > 0) {
                    const { invoicesRegistered, invoicesFailed } = await invoiceServices.createInvoicesService({ invoices })
                    const filteredInvoices = []
                
                    invoices.forEach(({ data: invoiceElement }) => {
                        const invoiceFound = invoicesRegistered.find(regInvoice => (
                            regInvoice.invoice.numberInvoice === invoiceElement.numberInvoice &&
                            regInvoice.invoice.codeSaleInvoice === invoiceElement.codeSaleInvoice &&
                            regInvoice.invoice.codePrefixInvoice === invoiceElement.codePrefixInvoice
                        ));
                        if (invoiceFound) return filteredInvoices.push(invoiceElement)
                    });

                    const updatePromises = filteredInvoices.map(invoiceToUpdate => {
                        return updateInvoiceSynchronizedJobQuery(
                            { 
                                id: decryptIdDataBase(invoiceToUpdate.key)
                            },
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