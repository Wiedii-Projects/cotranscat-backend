// Constants
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');
const { salesConst } = require('../constants/index.constants');

// Helpers
const { 
    responseHelpers, sharedHelpers 
} = require('../helpers/index.helpers');
const { 
    encryptIdDataBase, getInvoiceRegisterParametersByBankHelper 
} = require('../helpers/shared.helpers');

// Queries
const { createNewInvoiceQuery } = require('../models/invoice/invoice.query');
const { findServiceTypeQuery } = require('../models/service-type/service-type.query');
const { createNewTicketQuery } = require('../models/ticket/ticket.query');
const { invoiceQuery, travelQuery, shippingQuery } = require('../models/index.queries');
const { getHeadquarterAssociatedBySellerQuery } = require('../models/seller/seller.query');
const shipmentTrackingQuery = require('../models/shipment-tracking/shipment-tracking.query');
const trackingStatusQuery = require('../models/tracking-status/tracking-status.query');
const trackingConst = require('../constants/core/tracking.const');

module.exports = {
    createInvoiceTravel: async(req, res) => {
        let { tickets, idPaymentMethod, decryptId, price, priceSeat, user: { id } } = req.body;
        price = price ? price*tickets.length : priceSeat;
        let transaction;
        try {
            const idSeller = sharedHelpers.decryptIdDataBase(id);
            const [{ id: idServiceType }] = await findServiceTypeQuery({where: { type: salesConst.TYPE_SERVICE.PASSAGE.VALUE_CONVENTION }})
            transaction = await dbConnectionOptions.transaction();
            const { name: nameHeadquarter } = await getHeadquarterAssociatedBySellerQuery({ id: idSeller })
            const { codePrefix } = getInvoiceRegisterParametersByBankHelper(salesConst.TYPE_SERVICE.PASSAGE.VALUE_STRING, nameHeadquarter)
            const codeSale = salesConst.SALES_CODE.SALES_INVOICE

            const invoice = await createNewInvoiceQuery({ 
                idClient: decryptId, idServiceType, price, idSeller, idPaymentMethod, codePrefix, codeSale
            }, transaction);
            await createNewTicketQuery(tickets, { invoice: invoice.id, price: price/tickets.length, transaction});
            await transaction.commit();
            return responseHelpers.responseSuccess(res, encryptIdDataBase(invoice.id));
        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
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
                invoiceQuery.findAllInvoiceQuery({ where: {}, offset: page}),
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
    createInvoiceShipping: async(req, res) => {
         const { idPaymentMethod, depth, weight, width, high, declaredValue, insuranceCost, price, content, 
            isHomeDelivery, idClientSends: idClientSendEncrypt, idClientReceives: idClientReceivesEncrypt, 
            idShippingType: idShippingTypeEncrypt, idUnitMeasure: idUnitMeasureEncrypt, user: {id: idSellerEncrypt},
        } = req.body

        let transaction;
       
        try {
            const idSeller = sharedHelpers.decryptIdDataBase(idSellerEncrypt);
            const idClientSend = sharedHelpers.decryptIdDataBase(idClientSendEncrypt);
            const idClientReceives = sharedHelpers.decryptIdDataBase(idClientReceivesEncrypt);
            const idShippingType = sharedHelpers.decryptIdDataBase(idShippingTypeEncrypt);
            const idUnitMeasure = sharedHelpers.decryptIdDataBase(idUnitMeasureEncrypt);

            const [{ id: idServiceType }] = await findServiceTypeQuery({where: { type: salesConst.TYPE_SERVICE.PASSAGE.VALUE_CONVENTION }})

            transaction = await dbConnectionOptions.transaction();

            const { name: nameHeadquarter } = await getHeadquarterAssociatedBySellerQuery({ id: idSeller })
            const { codePrefix } = getInvoiceRegisterParametersByBankHelper(salesConst.TYPE_SERVICE.SHIPPING.VALUE_STRING, nameHeadquarter)

            const codeSale = salesConst.SALES_CODE.SALES_INVOICE

            const invoice = await createNewInvoiceQuery({ 
                idClient: idClientSend, idServiceType, price, idSeller, idPaymentMethod, codePrefix, codeSale
            }, transaction);
            
            let dateOfEntry = new Date().toISOString().split('T')[0];

            const currentDate = new Date();
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();
            const currentSecond = currentDate.getSeconds();
        
            const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSecond.toString().padStart(2, '0')}`;
        
            let timeOfEntry = formattedTime;

            const shipping = await shippingQuery.createShippingQuery({
                depth, weight, width, high, declaredValue, insuranceCost, content, isHomeDelivery,
                idClientReceives, idUnitMeasure, idShippingType, idInvoice :invoice.id, dateOfEntry, timeOfEntry
            }, transaction)

            const { RECEIVED } = trackingConst.TRACKING_STATUS

            const firstTrackingStatus = await trackingStatusQuery.findTrackingStatusByChronologicalPositionOfGroup(
                RECEIVED.VALUE_CONVENTION, RECEIVED.VALUE_STRING
            )

            await shipmentTrackingQuery.createShipmentTrackingQuery({
                idShipping: shipping.id, idTrackingStatus: sharedHelpers.decryptIdDataBase(firstTrackingStatus.id),
                date: currentDate, time: formattedTime
            }, transaction)

            await transaction.commit();

            return responseHelpers.responseSuccess(res, encryptIdDataBase(invoice.id));
        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    }
}