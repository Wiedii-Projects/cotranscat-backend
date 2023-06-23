// Constants
const { errorsConst } = require("../constants/index.constants")

// Infrastructure - Constants
const invoiceEndPoints = require("./constants/invoice.end-points")

// Infrastructure
const httpInfrastructure = require("./infrastructure/http.infrastructure")

module.exports = {
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