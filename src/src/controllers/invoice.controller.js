// Constants
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');
const { salesConst, errorsConst } = require('../constants/index.constants');
const { PAYMENT_METHOD } = require('../constants/core/invoice.const');
const { TYPE_SERVICE } = require('../constants/core/sales.const');

// Helpers
const {
    responseHelpers, sharedHelpers
} = require('../helpers/index.helpers');
const {
    encryptIdDataBase, decryptIdDataBase
} = require('../helpers/shared.helpers');
const { extractInvoice, extractInvoiceMoneyTransfer, extractInvoiceShipping } = require('../helpers/invoice.helpers');

// Libraries
const { Op, col, Sequelize } = require('sequelize');

// Queries
const { createNewInvoiceQuery, findInvoiceShippingQuery, updateInvoiceQuery, findChairsAssociatedWithATicketInvoiceQuery } = require('../models/invoice/invoice.query');
const { findServiceTypeQuery } = require('../models/service-type/service-type.query');
const { invoiceQuery, travelQuery, moneyTransferQuery, seatQuery } = require('../models/index.queries');
const shipmentTrackingQuery = require('../models/shipment-tracking/shipment-tracking.query');
const { findPaymentMethodQuery } = require('../models/payment-method/payment-method.query');
const prefixQuery = require('../models/prefix/prefix.query');
const sellerQuery = require('../models/seller/seller.query');
const { findMoneyTransferTrackerByIdMoneyTransfer } = require('../models/money-transfer-tracker/money-transfer-tracker.query');
const shippingQuery = require('../models/shipping/shipping.query');
const ticketQuery = require('../models/ticket/ticket.query');

module.exports = {
    getInvoiceTravel: async(req, res) => {
        try {
            return responseHelpers.responseSuccess(res, req.body.invoice);
        } catch (error){
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getInvoiceMoneyTransfer: async(req, res) => {
        const { filterValue } = req.query
        try {
            let filterSearch
            if (!isNaN(filterValue)) filterSearch = { number: filterValue }
            else {
                const value = sharedHelpers.decryptIdDataBase(filterValue)
                if (!isNaN(value)) filterSearch = { id: value }
            }
            if (!filterSearch) throw errorsConst.shippingErrors.filterValueInvalid;
            const [{ id: idServiceType }] = await findServiceTypeQuery({ where: { type: TYPE_SERVICE.MONEY_TRANSFER.VALUE_CONVENTION } });
            let moneyTransferInvoice = await invoiceQuery.findInvoiceMoneyTransferQuery({ where: { ...filterSearch, idServiceType } });
            if (moneyTransferInvoice) {
                const moneyTransferTracker = await findMoneyTransferTrackerByIdMoneyTransfer(decryptIdDataBase(moneyTransferInvoice.invoiceMoneyTransfer.id))
                moneyTransferInvoice.moneyTransferTracker = moneyTransferTracker
            }
            return responseHelpers.responseSuccess(res, moneyTransferInvoice);
        } catch (error){
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllInvoiceMoneyTransfer: async(req, res) => {
        const { page = 0, filterType, filterValue, startDate, endDate } = req.query;
        try {
            const [{ id: idServiceType }] = await findServiceTypeQuery({ where: { type: TYPE_SERVICE.MONEY_TRANSFER.VALUE_CONVENTION } });

            let whereInvoice = {
                idServiceType
            };
            let countRegisterFound = 0

            if (filterType) {
                switch (filterType) {
                    case 'clientName':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceClient.UserClient.name'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'clientNumberDocument':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceClient.UserClient.numberDocument'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'sellerName':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceSeller.UserSeller.name'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'price':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('Invoice.price'), '=', parseFloat(filterValue))
                            ]
                        };
                        break;
                    case 'dateRange':
                        if (filterValue) {
                            const containsDash = filterValue.includes("-");
                            if (!containsDash) {
                                whereInvoice = {
                                    ...whereInvoice,
                                    [Op.and]: [
                                        Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                        Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                    ],
                                    [Op.or]: [
                                        Sequelize.where(col('InvoiceClient.UserClient.name'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('InvoiceClient.UserClient.numberDocument'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('InvoiceSeller.UserSeller.name'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('Invoice.number'), 'REGEXP', `${filterValue}`)
                                    ]
                                }
                            } else {
                                let parametersFilter = []
                                filterValue.split("-").map((item, index) => {
                                    if (index === 0) parametersFilter.push(Sequelize.where(col('Invoice.codeSale'), 'REGEXP', `${item}`))
                                    if (index === 1) parametersFilter.push(Sequelize.where(col('ResolutionInvoice.PrefixResolution.code'), `${item}`))
                                    if (index === 2) parametersFilter.push(Sequelize.where(col('Invoice.number'), 'REGEXP', `${item}`))
                                })
                                whereInvoice = {
                                    ...whereInvoice,
                                    [Op.and]: [
                                        ...parametersFilter,
                                        Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                        Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                    ]
                                }
                            }
                        } else {
                            whereInvoice = {
                                ...whereInvoice,
                                [Op.and]: [
                                    Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                    Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                ]
                            }
                        }
                        break;

                    case 'municipalityArrive':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('MoneyTransferInvoice.MoneyTransferClient.ClientMunicipality.name'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;

                    default:
                        break;
                }
            } else {
                countRegisterFound = await invoiceQuery.countInvoiceQuery({ idServiceType })
            }

            const moneyTransferInvoices = await invoiceQuery.findAllMoneyTransferInvoiceQuery({
                where: whereInvoice,
                offset: page
            })

            if (filterType) countRegisterFound = moneyTransferInvoices.length

            return responseHelpers.responseSuccess(res, { countRegisterFound, moneyTransferInvoices });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllInvoiceTravel: async (req, res) => {
        const { page = 0, filterType, filterValue, startDate, endDate } = req.query;

        try {
            const [{ id: idServiceType }] = await findServiceTypeQuery({ where: { type: TYPE_SERVICE.PASSAGE.VALUE_CONVENTION } });

            let whereInvoice = {
                idServiceType
            };

            let countRegisterFound = 0

            if (filterType) {
                switch (filterType) {
                    case 'clientName':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceClient.UserClient.name'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'clientNumberDocument':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceClient.UserClient.numberDocument'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'sellerName':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceSeller.UserSeller.name'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'price':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('Invoice.price'), '=', parseFloat(filterValue))
                            ]
                        };
                        break;
                    case 'dateRange':
                        if (filterValue) {
                            const containsDash = filterValue.includes("-");
                            if (!containsDash) {
                                whereInvoice = {
                                    ...whereInvoice,
                                    [Op.and]: [
                                        Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                        Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                    ],
                                    [Op.or]: [
                                        Sequelize.where(col('InvoiceClient.UserClient.name'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('InvoiceClient.UserClient.numberDocument'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('InvoiceSeller.UserSeller.name'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('Invoice.number'), 'REGEXP', `${filterValue}`)
                                    ]
                                }
                            } else {
                                let parametersFilter = []
                                filterValue.split("-").map((item, index) => {
                                    if (index === 0) parametersFilter.push(Sequelize.where(col('Invoice.codeSale'), 'REGEXP', `${item}`))
                                    if (index === 1) parametersFilter.push(Sequelize.where(col('ResolutionInvoice.PrefixResolution.code'), `${item}`))
                                    if (index === 2) parametersFilter.push(Sequelize.where(col('Invoice.number'), 'REGEXP', `${item}`))
                                })
                                whereInvoice = {
                                    ...whereInvoice,
                                    [Op.and]: [
                                        ...parametersFilter,
                                        Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                        Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                    ]
                                }
                            }
                        } else {
                            whereInvoice = {
                                ...whereInvoice,
                                [Op.and]: [
                                    Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                    Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                ]
                            }
                        }
                        break;
                        
                    default:
                        break;
                }
            } else {
                countRegisterFound = await invoiceQuery.countInvoiceQuery({ idServiceType })
            }

            let invoice = await invoiceQuery.findAllTravelInvoiceQuery({
                where: whereInvoice,
                offset: page
            })
            
            let rows = [];
            for (const value of invoice) {
                let whereTravel = {
                    id: value.idTravel
                };

                if (filterType && filterType === 'municipalityArrive') {
                    whereTravel = {
                        ...whereTravel,
                        [Op.and]: [
                            Sequelize.where(col('TravelRoute.MunicipalityArrive.name'), 'LIKE', `%${filterValue}%`)
                        ]
                    };
                }
                const route = await travelQuery.findRouteToTravel(whereTravel);
                if (route.municipalityDepart !== "" && route.municipalityArrive !== "") {
                    rows.push({
                        ...route,
                        ...value,
                        idTravel: undefined
                    })
                }
            }

            if (filterType && filterType === 'municipalityArrive') countRegisterFound = rows.length
            else countRegisterFound = invoice.length

            return responseHelpers.responseSuccess(res, { count: countRegisterFound, rows });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    createInvoiceMoneyTransfer: async(req, res) => {
        let transaction;
        const { user: { id: idSeller }, amountMoney, cost, iva, clientSend: { id: idClient }, clientReceives: { id: idClientReceives }, isElectronic } = req.body;
        try {
            const moneyTransfer = extractInvoiceMoneyTransfer({ ...req.body, idClientReceives });
            const [[{ id: idPaymentMethod }], [{ id: idServiceType, type }]] = await Promise.all([
                findPaymentMethodQuery({ where: { name: PAYMENT_METHOD.CASH } }),
                findServiceTypeQuery({ where: { type: TYPE_SERVICE.MONEY_TRANSFER.VALUE_CONVENTION } })
            ]);

            const resolutionsFound = await sellerQuery.getPrefixesOfResolutionByBankSellerQuery(sharedHelpers.decryptIdDataBase(idSeller), idServiceType, isElectronic);
            const { numberFormatted: number, numberRaw, idPrefix, idResolution } = await sharedHelpers.getPrefixAndInvoiceNumberNewRegister(resolutionsFound)

            let invoice = extractInvoice({
                price: (amountMoney + cost + iva),
                idServiceType,
                idPaymentMethod,
                codeSale: salesConst.SALES_CODE.SALES_INVOICE,
                idClient,
                idSeller,
                number,
                idResolution
            });

            invoice.synchronizationType = salesConst.TYPE_SYNCHRONIZATION_INVOICES.ONLY_CREATE_INVOICE

            transaction = await dbConnectionOptions.transaction();

            const { id } = await createNewInvoiceQuery(invoice, { transaction, moneyTransfer, type });

            await prefixQuery.updatePrefixQuery(
                { id: decryptIdDataBase(idPrefix) },
                { currentConsecutive: numberRaw },
                transaction
            )

            await transaction.commit();
            return responseHelpers.responseSuccess(res, encryptIdDataBase(id));
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    createInvoiceTravel: async(req, res) => {
        let transaction;
        const { tickets, user: { id: idSeller }, price, decryptId: idClient, priceSeat, idPaymentMethod, isElectronic } = req.body;
        try {

            const [{ id: idServiceType, type }] = await  findServiceTypeQuery({ where: { type: TYPE_SERVICE.PASSAGE.VALUE_CONVENTION } });

            const resolutionsFound = await sellerQuery.getPrefixesOfResolutionByBankSellerQuery(sharedHelpers.decryptIdDataBase(idSeller), idServiceType, isElectronic);
            const { numberFormatted: number, numberRaw, idPrefix, idResolution }  = await sharedHelpers.getPrefixAndInvoiceNumberNewRegister(resolutionsFound)

            let invoice = extractInvoice({
                price: price ? price*tickets.length : priceSeat,
                idServiceType,
                idPaymentMethod,
                codeSale: salesConst.SALES_CODE.SALES_INVOICE,
                idClient,
                idSeller,
                number,
                idResolution
            });

            invoice.synchronizationType = salesConst.TYPE_SYNCHRONIZATION_INVOICES.ONLY_CREATE_INVOICE

            transaction = await dbConnectionOptions.transaction();

            const { id } = await createNewInvoiceQuery(invoice, { transaction, tickets, price: invoice.price/tickets.length, type });

            await prefixQuery.updatePrefixQuery(
                { id: decryptIdDataBase(idPrefix) },
                { currentConsecutive: numberRaw },
                transaction
            )

            await transaction.commit();

            return responseHelpers.responseSuccess(res, encryptIdDataBase(id));
        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    createInvoiceShipping: async(req, res) => {
        let transaction;
        const { user: { id: idSeller }, price, clientSend: { id: idClient }, clientReceives: { id: idClientReceives }, isElectronic } = req.body;
        try {
            const shipping = extractInvoiceShipping({ ...req.body, idClientReceives });
            const [[{ id: idPaymentMethod }], [{ id: idServiceType, type }]] = await Promise.all([
                findPaymentMethodQuery({ where: { name: PAYMENT_METHOD.CASH } }),
                findServiceTypeQuery({ where: { type: TYPE_SERVICE.SHIPPING.VALUE_CONVENTION } })
            ]);

            const resolutionsFound = await sellerQuery.getPrefixesOfResolutionByBankSellerQuery(sharedHelpers.decryptIdDataBase(idSeller), idServiceType, isElectronic);
            const { numberFormatted: number, numberRaw, idPrefix, idResolution } = await sharedHelpers.getPrefixAndInvoiceNumberNewRegister(resolutionsFound)

            let invoice = extractInvoice({
                price,
                idServiceType,
                idPaymentMethod,
                codeSale: salesConst.SALES_CODE.SALES_INVOICE,
                idClient,
                idSeller,
                number,
                idResolution
            });

            invoice.synchronizationType = salesConst.TYPE_SYNCHRONIZATION_INVOICES.ONLY_CREATE_INVOICE

            transaction = await dbConnectionOptions.transaction();

            const { id } = await createNewInvoiceQuery(invoice, { transaction, shipping, type });

            await prefixQuery.updatePrefixQuery(
                { id: decryptIdDataBase(idPrefix) },
                { currentConsecutive: numberRaw },
                transaction
            )

            await transaction.commit();
            return responseHelpers.responseSuccess(res, encryptIdDataBase(id));

        } catch (error){
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getInvoiceShipping: async (req, res) => {
        const { filterValue } = req.query
        try {
            let filterSearch
            let shippingInvoice
            const value = sharedHelpers.decryptIdDataBase(filterValue)

            if (value && !isNaN(value)) {
                filterSearch = { id: value }
                if (!filterSearch) throw errorsConst.shippingErrors.filterValueInvalid

                shippingInvoice = await findInvoiceShippingQuery(filterSearch)
            } else {
                const [codeSale, codePrefix, numberInvoice] = filterValue.split('-')
                filterSearch = { number: numberInvoice, codeSale }
                let whereCodePrefix = { code: codePrefix }
                const [prefixFound] = await prefixQuery.findPrefixQuery({ where: { code: codePrefix } });

                if (!prefixFound) throw errorsConst.prefixErrors.prefixNotExists
                if (salesConst.SALES_CODE.SALES_INVOICE !== codeSale) throw errorsConst.invoiceErrors.codeSaleNotExist
                if (!filterSearch) throw errorsConst.shippingErrors.filterValueInvalid

                shippingInvoice = await findInvoiceShippingQuery(filterSearch, whereCodePrefix)

            }
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
    getAllInvoiceShipping: async (req, res) => {
        const { page = 0, filterType, filterValue, startDate, endDate } = req.query;
        try {
            const [{ id: idServiceType }] = await findServiceTypeQuery({ where: { type: TYPE_SERVICE.SHIPPING.VALUE_CONVENTION } });

            let whereInvoice = {
                idServiceType
            };
            let countRegisterFound = 0

            if (filterType) {
                switch (filterType) {
                    case 'clientName':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceClient.UserClient.name'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'clientNumberDocument':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceClient.UserClient.numberDocument'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'sellerName':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('InvoiceSeller.UserSeller.name'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                        break;
                    case 'price':
                        whereInvoice = {
                            ...whereInvoice,
                            [Op.and]: [
                                Sequelize.where(col('Invoice.price'), '=', parseFloat(filterValue))
                            ]
                        };
                        break;
                    case 'dateRange':
                        if (filterValue) {
                            const containsDash = filterValue.includes("-");
                            if (!containsDash) {
                                whereInvoice = {
                                    ...whereInvoice,
                                    [Op.and]: [
                                        Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                        Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                    ],
                                    [Op.or]: [
                                        Sequelize.where(col('InvoiceClient.UserClient.name'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('InvoiceClient.UserClient.numberDocument'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('InvoiceSeller.UserSeller.name'), 'REGEXP', `${filterValue}`),
                                        Sequelize.where(col('Invoice.number'), 'REGEXP', `${filterValue}`)
                                    ]
                                }
                            } else {
                                let parametersFilter = []
                                filterValue.split("-").map((item, index) => {
                                    if (index === 0) parametersFilter.push(Sequelize.where(col('Invoice.codeSale'), 'REGEXP', `${item}`))
                                    if (index === 1) parametersFilter.push(Sequelize.where(col('ResolutionInvoice.PrefixResolution.code'), `${item}`))
                                    if (index === 2) parametersFilter.push(Sequelize.where(col('Invoice.number'), 'REGEXP', `${item}`))
                                })
                                whereInvoice = {
                                    ...whereInvoice,
                                    [Op.and]: [
                                        ...parametersFilter,
                                        Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                        Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                    ]
                                }
                            }
                        } else {
                            whereInvoice = {
                                ...whereInvoice,
                                [Op.and]: [
                                    Sequelize.where(col('Invoice.date'), '>=', `${startDate} 00:00:00`),
                                    Sequelize.where(col('Invoice.date'), '<=', `${endDate} 23:59:59`),
                                ]
                            }
                        }
                        break;

                    default:
                        break;
                }
            } else {
                countRegisterFound = await shippingQuery.countShippingInvoiceQuery()
            }

            const shippingInvoices = await invoiceQuery.findAllShippingInvoiceQuery({
                where: whereInvoice,
                offset: page
            })

            let rows = [];
            for (const value of shippingInvoices) {

                if (!value.idTravel) {
                    rows.push({
                        municipalityDepart: "",
                        municipalityArrive: "",
                        ...value,
                        idTravel: undefined
                    })
                } else {
                    let whereTravel = {
                        id: decryptIdDataBase(value.idTravel)
                    };

                    if (filterType && filterType === 'municipalityArrive') {
                        whereTravel = {
                            ...whereTravel,
                            [Op.and]: [
                                Sequelize.where(col('TravelRoute.MunicipalityArrive.name'), 'LIKE', `%${filterValue}%`)
                            ]
                        };
                    }
                    const route = await travelQuery.findRouteToTravel(whereTravel);
                    if (route.municipalityDepart !== "" && route.municipalityArrive !== "") {
                        rows.push({
                            ...route,
                            ...value,
                            idTravel: undefined
                        })
                    }
                }
            }

            if (filterType && filterType === 'municipalityArrive') countRegisterFound = rows.length
            else countRegisterFound = shippingInvoices.length

            return responseHelpers.responseSuccess(res, { count: countRegisterFound, rows });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    cancelationInvoice: async (req, res) => {
        let transaction;
        try {
            const { invoice, date, time } = req.body;
            const [{ type: valueConventionServiceType }] = await findServiceTypeQuery({ where: { id: decryptIdDataBase(invoice.idServiceType) } });

            transaction = await dbConnectionOptions.transaction();

            if (valueConventionServiceType === TYPE_SERVICE.PASSAGE.VALUE_CONVENTION) {
                let whereInvoice = {
                    [Op.and]: [
                        Sequelize.where(col('Invoice.id'), '=', sharedHelpers.decryptIdDataBase(invoice.id)),
                        Sequelize.where(col('TicketInvoice.TicketSeat.TravelSeat.date'), '>=', new Date(date)),
                        Sequelize.where(col('TicketInvoice.TicketSeat.TravelSeat.time'), '>=', time),
                    ]
                };
                const [seatFoundByInvoice] = await findChairsAssociatedWithATicketInvoiceQuery({ where: whereInvoice })

                let promiseChangeStateAvailableSeat = []

                if (seatFoundByInvoice && seatFoundByInvoice.TicketInvoice.length !== 0) {
                    
                    seatFoundByInvoice.TicketInvoice.forEach(element => {
                        promiseChangeStateAvailableSeat.push(
                            seatQuery.updateSeat({ state: 0 }, { id: element.TicketSeat.id }, transaction)
                            )
                    });
                    
                    await Promise.all(promiseChangeStateAvailableSeat)
                }
            }

            let newSynchronizationType = 2

            if (!invoice.isSynchronized && invoice.synchronizationType === 1) newSynchronizationType = 3

            await updateInvoiceQuery(
                { id: decryptIdDataBase(invoice.id) },
                {
                    price: 0,
                    observation: "invoice canceled",
                    synchronizationType: newSynchronizationType,
                    isSynchronized: false,
                    isCancelled: true
                },
                transaction
            )

            await transaction.commit();
            
            return responseHelpers.responseSuccess(res, true);
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    createElectronicInvoice: async (req, res) => {
        let transaction;
        let optionsQuery = {}
        try {
            const { invoice } = req.body;
            const [ { type: valueConventionServiceType }] = await findServiceTypeQuery({ where: { id: decryptIdDataBase(invoice.idServiceType)} });

            switch (valueConventionServiceType) {
                case TYPE_SERVICE.PASSAGE.VALUE_CONVENTION:
                    let ticketInvoice = await ticketQuery.findAllQuery({ where: { idInvoice: decryptIdDataBase(invoice.id) } })

                    let tickets = ticketInvoice.map((result) => ({
                        number: result.number,
                        code: result.code,
                        numberPhone: result.numberPhone,
                        passengerName: result.passengerName,
                        passengerLastName: result.passengerLastName,
                        idSeat: result.idSeat,
                        idIndicativeNumber: result.idIndicativeNumber
                    }))
                    optionsQuery.price = invoice.price
                    optionsQuery.tickets = tickets
                    break;
                case TYPE_SERVICE.SHIPPING.VALUE_CONVENTION:
                    let shippingInvoice = await shippingQuery.findOneQuery({ where: { idInvoice: decryptIdDataBase(invoice.id) } })
                    shippingInvoice.idClientReceives = decryptIdDataBase(shippingInvoice.idClientReceives)

                    let shipping = extractInvoiceShipping(shippingInvoice);
                    optionsQuery.shipping = shipping
                    break;
                case TYPE_SERVICE.MONEY_TRANSFER.VALUE_CONVENTION:
                    let moneyTransferFound = await moneyTransferQuery.findOneQuery({ where: { idInvoice: decryptIdDataBase(invoice.id) } })
                    moneyTransferFound.idClientReceives = decryptIdDataBase(moneyTransferFound.idClientReceives)
                    let moneyTransfer = extractInvoiceMoneyTransfer(moneyTransferFound);
                    optionsQuery.moneyTransfer = moneyTransfer
                    break;

                default:
                    throw errorsConst.appErrors.serviceTypeConventionNotFound
            }


            const resolutionsFound = await sellerQuery.getPrefixesOfResolutionByBankSellerQuery(sharedHelpers.decryptIdDataBase(invoice.idSeller), sharedHelpers.decryptIdDataBase(invoice.idServiceType), true);
            const { numberFormatted: number, numberRaw, idPrefix, idResolution } = await sharedHelpers.getPrefixAndInvoiceNumberNewRegister(resolutionsFound)

            let invoiceElectronic = extractInvoice({
                price: invoice.price,
                idServiceType: sharedHelpers.decryptIdDataBase(invoice.idServiceType),
                idPaymentMethod: invoice.idPaymentMethod,
                codeSale: invoice.codeSale,
                idClient: sharedHelpers.decryptIdDataBase(invoice.idClient),
                idSeller: invoice.idSeller,
                number,
                idResolution
            });
            invoiceElectronic.synchronizationType = salesConst.TYPE_SYNCHRONIZATION_INVOICES.ONLY_CREATE_INVOICE

            transaction = await dbConnectionOptions.transaction();

            // Cancelation Invoice
            let newSynchronizationType = 2
            if (!invoice.isSynchronized && invoice.synchronizationType === 1) newSynchronizationType = 3

            await updateInvoiceQuery(
                { id: decryptIdDataBase(invoice.id) },
                {
                    price: 0,
                    observation: "invoice canceled - create electronic invoice",
                    synchronizationType: newSynchronizationType,
                    isSynchronized: false,
                    isCancelled: true
                },
                transaction
            )

            // Create Electronic Invoice
            optionsQuery = {...optionsQuery, transaction, type: valueConventionServiceType }
            const { id } = await createNewInvoiceQuery(invoiceElectronic, optionsQuery);

            await prefixQuery.updatePrefixQuery(
                { id: decryptIdDataBase(idPrefix) },
                { currentConsecutive: numberRaw },
                transaction
            )

            await transaction.commit();
            return responseHelpers.responseSuccess(res, encryptIdDataBase(id));

        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    }
}