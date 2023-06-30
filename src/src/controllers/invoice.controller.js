// Constants
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');
const { salesConst, errorsConst } = require('../constants/index.constants');
const trackingConst = require('../constants/core/tracking.const');

// Helpers
const { 
    responseHelpers, sharedHelpers 
} = require('../helpers/index.helpers');
const { 
    encryptIdDataBase, getInvoiceRegisterParametersByBankHelper, decryptIdDataBase 
} = require('../helpers/shared.helpers');

// Queries
const { createNewInvoiceQuery, getInvoiceDetailsShippingQuery } = require('../models/invoice/invoice.query');
const { findServiceTypeQuery } = require('../models/service-type/service-type.query');
const { createNewTicketQuery } = require('../models/ticket/ticket.query');
const { invoiceQuery, travelQuery, shippingQuery } = require('../models/index.queries');
const { getHeadquarterAssociatedBySellerQuery } = require('../models/seller/seller.query');
const shipmentTrackingQuery = require('../models/shipment-tracking/shipment-tracking.query');
const trackingStatusQuery = require('../models/tracking-status/tracking-status.query');
const { findPaymentMethodQuery } = require('../models/payment-method/payment-method.query');
const { PAYMENT_METHOD } = require('../constants/core/invoice.const');
const { extractInvoice, extractInvoiceMoneyTransfer, extractInvoiceShipping, extractInvoiceTravel } = require('../helpers/invoice.helpers');
const { TYPE_SERVICE } = require('../constants/core/sales.const');
const { createMoneyTransferQuery } = require('../models/money-transfer/money-transfer.query');
const { createMoneyTransferTrackerQuery } = require('../models/money-transfer-tracker/money-transfer-tracker.query');

module.exports = {
    getInvoice: async(req, res) => {
        try {
            return responseHelpers.responseSuccess(res, req.body.invoice);
        } catch (error){
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllInvoice: async(req, res) => {
        const { page = 0 } = req.query;
        try {
            let [invoice, count] = await Promise.all([
                invoiceQuery.findAllTravelInvoiceQuery({ 
                    where: { 
                        idServiceType: salesConst.TYPE_SERVICE.PASSAGE.VALUE_CONVENTION
                    }, 
                    offset: page
                }),
                invoiceQuery.countInvoiceQuery()
            ]);
            let rows = [];
            for (const value of invoice) {
                const route = await travelQuery.findRouteToTravel({ id: value.idTravel });
                rows.push({
                    ...route,
                    ...value,
                    idTravel: undefined
                })
              }
            return responseHelpers.responseSuccess(res, { count, rows });
        } catch (error){
            return responseHelpers.responseError(res, 500, error);
        }
    },
    createInvoiceMoneyTransfer: async(req, res) => {
        let transaction;
        const { user: { id: idSeller }, amountMoney, cost, iva, clientSend: { id: idClient }, clientReceives: { id: idClientReceives } } = req.body;
        try {
            const moneyTransfer = extractInvoiceMoneyTransfer({ ...req.body, idClientReceives });
            const [[{ id: idPaymentMethod }], [{ id: idServiceType }]] = await Promise.all([
                findPaymentMethodQuery({ where: { name: PAYMENT_METHOD.CASH } }),
                findServiceTypeQuery({ where: { type: TYPE_SERVICE.MONEY_TRANSFER.VALUE_CONVENTION } })
            ]);
            const { name: nameHeadquarter } = await getHeadquarterAssociatedBySellerQuery({ id: decryptIdDataBase(idSeller) });
            const { codePrefix } = getInvoiceRegisterParametersByBankHelper(salesConst.TYPE_SERVICE.MONEY_TRANSFER.VALUE_STRING, nameHeadquarter);
            const invoice = extractInvoice({ 
                price: (amountMoney + cost + iva),
                idServiceType,
                idPaymentMethod,
                codePrefix,
                codeSale: salesConst.SALES_CODE.SALES_INVOICE,
                idClient,
                idSeller
            });
            transaction = await dbConnectionOptions.transaction();
            const { id } = await createNewInvoiceQuery(invoice, { transaction, moneyTransfer });
            await transaction.commit();
            return responseHelpers.responseSuccess(res, encryptIdDataBase(id));
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    createInvoiceTravel: async(req, res) => {
        const { tickets, user: { id: idSeller }, price, decryptId: idClient, priceSeat, idPaymentMethod } = req.body;
        try {
            const [{ id: idServiceType }] = await  findServiceTypeQuery({ where: { type: TYPE_SERVICE.PASSAGE.VALUE_CONVENTION } });
            const { name: nameHeadquarter } = await getHeadquarterAssociatedBySellerQuery({ id: decryptIdDataBase(idSeller) });
            const { codePrefix } = getInvoiceRegisterParametersByBankHelper(salesConst.TYPE_SERVICE.PASSAGE.VALUE_STRING, nameHeadquarter);
            const invoice = extractInvoice({ 
                price: price ? price*tickets.length : priceSeat,
                idServiceType,
                idPaymentMethod,
                codePrefix,
                codeSale: salesConst.SALES_CODE.SALES_INVOICE,
                idClient,
                idSeller
            });
            transaction = await dbConnectionOptions.transaction();
            const { id } = await createNewInvoiceQuery(invoice, { transaction, tickets, price: invoice.price/tickets.length });
            await transaction.commit();
            return responseHelpers.responseSuccess(res, encryptIdDataBase(id));
        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    createInvoiceShipping: async(req, res) => {
        let transaction;
        const { user: { id: idSeller }, price, clientSend: { id: idClient }, clientReceives: { id: idClientReceives } } = req.body;
        try {
            const shipping = extractInvoiceShipping({ ...req.body, idClientReceives });
            const [[{ id: idPaymentMethod }], [{ id: idServiceType }]] = await Promise.all([
                findPaymentMethodQuery({ where: { name: PAYMENT_METHOD.CASH } }),
                findServiceTypeQuery({ where: { type: TYPE_SERVICE.SHIPPING.VALUE_CONVENTION } })
            ]);
            const { name: nameHeadquarter } = await getHeadquarterAssociatedBySellerQuery({ id: decryptIdDataBase(idSeller) })
            const { codePrefix } = getInvoiceRegisterParametersByBankHelper(salesConst.TYPE_SERVICE.SHIPPING.VALUE_STRING, nameHeadquarter)
            const invoice = extractInvoice({ 
                price,
                idServiceType,
                idPaymentMethod,
                codePrefix,
                codeSale: salesConst.SALES_CODE.SALES_INVOICE,
                idClient,
                idSeller
            });
            transaction = await dbConnectionOptions.transaction();
            const { id } = await createNewInvoiceQuery(invoice, { transaction, shipping });
            await transaction.commit();
            return responseHelpers.responseSuccess(res, encryptIdDataBase(id));
            
        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getShipping: async (req, res) => {
        const { filterValue } = req.query
        try {
            let filterSearch
            if (!isNaN(filterValue)) filterSearch = { number: filterValue }
            else {
                const value = sharedHelpers.decryptIdDataBase(filterValue)
                if (!isNaN(value)) filterSearch = { id: value }
            }
            if (!filterSearch) throw errorsConst.shippingErrors.filterValueInvalid

            let shippingInvoice = await getInvoiceDetailsShippingQuery(filterSearch)

            if (shippingInvoice) {
                const {invoiceDetails} = shippingInvoice
                const shipmentTrackingResponse = await shipmentTrackingQuery.findShipmentTrackingByIdShipping(decryptIdDataBase(invoiceDetails.id))
                shippingInvoice.shipmentTracking = shipmentTrackingResponse
            }

            return responseHelpers.responseSuccess(res, shippingInvoice);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllShippingInvoice: async (req, res) => {
        const { page = 0 } = req.query;
        try {
            let [shippingInvoices, counterShipping] = await Promise.all([
                invoiceQuery.findAllShippingInvoiceQuery({ where: {}, offset: page }),
                invoiceQuery.countInvoiceQuery()
            ]);

            return responseHelpers.responseSuccess(res, { count: counterShipping, shippingInvoices });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}