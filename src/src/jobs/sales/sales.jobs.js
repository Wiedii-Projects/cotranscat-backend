// Constants
const salesConst = require("../../constants/core/sales.const");

// Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

// Queues
const { invoiceSynchronizationJobsQueue } = require("../../connections/queues/sales.queues.connection");

// Queries - Jobs
const { getInvoiceDetailsJobQuery } = require("../infrastructure/queries/invoice/invoice.query.job");

// Services
const { invoiceServices } = require("../../services/index.services");

module.exports = {
     synchronizeInvoicesStatusPendingJob: async (job) => {
        try {
    
          const {
            invoicePrice,
            bankHeadquarterName,
            bankCodePaymentMethod,
            bankCode,
            sellerEmail,
            sellerName,
            sellerNumberDocument,
            sellerDocumentType,
            clientName,clientEmail,
            clientNumberDocument,
            clientDocumentType
          } = await getInvoiceDetailsJobQuery(3, 4)
    
          const { codeSale, prefix, code } = sharedHelpers.getInvoiceRegisterParametersByBankHelper(salesConst.TYPE_SERVICE.PASSAGE, bankHeadquarterName)
    
          let lastNumberInvoice = await invoiceServices.getLastNumberInvoiceService()

          const invoices = [
            {
              numberInvoice: `${lastNumberInvoice+1}`,
              codeSaleInvoice: codeSale,
              codePrefixInvoice: prefix,
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
                  code,
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
          ]

          const response = await invoiceServices.createInvoicesService({invoices: invoices})
    
          job.data = {
            inputJob: invoices,
            outputJob: response 
          }
    
            await invoiceSynchronizationJobsQueue.add(job.type, job, job.options);
        } catch {
            // TODO: Create register on redis or log register on local BD
        }
       
    }
}