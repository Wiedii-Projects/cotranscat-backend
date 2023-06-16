// Constants
const { errorsConst } = require("../constants/index.constants")

// Infrastructure - Constants
const invoiceEndPoints = require("./constants/invoice.end-points")

// Infrastructure
const httpInfrastructure = require("./infrastructure/http.infrastructure")

module.exports = {
    getLastNumberInvoiceService: async () => {
        try {
            const { data: responseLastNumberInvoice, error } = await httpInfrastructure.get(invoiceEndPoints.GET_LAST_NUMBER_INVOICE)
            if (responseLastNumberInvoice && responseLastNumberInvoice.status) {
                let lastNumberInvoice = responseLastNumberInvoice.data
                if(isNaN(lastNumberInvoice)) throw errorsConst.invoiceErrors.servicesErrors.getLastNumberInvoiceError
                return parseInt(lastNumberInvoice)
            } else {
                throw error
            }
        } catch (err) {
            throw err
        }
    },
    createInvoicesService: async (invoices) => {
        try {
            const { data: responseRegisterInvoices, error } = await httpInfrastructure.post(invoiceEndPoints.CREATE_INVOICES, invoices)
            if (responseRegisterInvoices && responseRegisterInvoices.status) {
                return responseRegisterInvoices.data
            } else {
                throw error
            }
        } catch (err) {
            throw err
        }
    }
}