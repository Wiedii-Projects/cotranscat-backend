// Constants
const { errorsConst } = require("../../../../constants/index.constants");

// Libraries
const { col } = require("sequelize");

// Models
const BankSchema = require("../../../../models/bank/bank.model");
const ClientSchema = require("../../../../models/client/client.model");
const DocumentTypeSchema = require("../../../../models/document-type/document-type.model");
const InvoiceSchema = require("../../../../models/invoice/invoice.model");
const PaymentMethodBankSchema = require("../../../../models/payment-method-bank/payment-method-bank.model");
const SellerSchema = require("../../../../models/seller/seller.model");
const UserSchema = require("../../../../models/user/user.model");
const ServiceTypeSchema = require("../../../../models/service-type/service-type.model");

module.exports = {
    getInvoicesDetailsNotSynchronizedJobQuery: async () => {
        try {
            const invoicesDetails = await InvoiceSchema.findAll({
                raw: true,
                nest: true,
                attributes: [
                    [col('Invoice.synchronizationType'), 'synchronizationType'],
                    [col('Invoice.codeSale'), 'codeSale'],
                    [col('Invoice.codePrefix'), 'codePrefix'],
                    [col('InvoiceServiceType.code'), 'codeTypeService'],
                    [col('Invoice.number'), 'invoiceNumber'],
                    [col('Invoice.price'), 'invoicePrice'],
                    [col('InvoiceSeller->BankSeller->BankPaymentMethod.codePaymentMethod'), 'bankCodePaymentMethod'],
                    [col('InvoiceSeller->BankSeller.code'), 'bankCode'],
                    [col('InvoiceSeller.email'), 'sellerEmail'],
                    [col('InvoiceSeller->UserSeller.name'), 'sellerName'],
                    [col('InvoiceSeller->UserSeller.numberDocument'), 'sellerNumberDocument'],
                    [col('InvoiceSeller->UserSeller->UserDocumentType.code'), 'sellerDocumentType'],
                    [col('InvoiceClient->UserClient.name'), 'clientName'],
                    [col('InvoiceClient.email'), 'clientEmail'],
                    [col('InvoiceClient->UserClient.numberDocument'), 'clientNumberDocument'],
                    [col('InvoiceClient->UserClient->UserDocumentType.code'), 'clientDocumentType']
                ],
                include: [
                    {
                        model: SellerSchema,
                        as: 'InvoiceSeller',
                        attributes: [],
                        include: [
                            {
                                model: BankSchema,
                                as: 'BankSeller',
                                attributes: [],
                                include: [
                                    {
                                        model: PaymentMethodBankSchema,
                                        as: 'BankPaymentMethod',
                                        attributes: []
                                    }
                                ]
                            },
                            {
                                model: UserSchema,
                                as: 'UserSeller',
                                attributes: [],
                                include: [
                                    {
                                        model: DocumentTypeSchema,
                                        as: 'UserDocumentType',
                                        attributes: []
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        model: ClientSchema,
                        as: 'InvoiceClient',
                        attributes: [],
                        include: [
                            {
                                model: UserSchema,
                                as: 'UserClient',
                                attributes: [],
                                include: [
                                    {
                                        model: DocumentTypeSchema,
                                        as: 'UserDocumentType',
                                        attributes: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: ServiceTypeSchema,
                        as: 'InvoiceServiceType',
                        attributes: []
                    }
                ],
                where: {
                    isSynchronized: false
                }
            })
            
            const invoicesNotSynchronized = invoicesDetails.map(({ invoiceNumber,  ...otherData }) => {
                return {
                    invoiceNumber: parseInt(invoiceNumber),
                    ...otherData
                }
            })

            return invoicesNotSynchronized
        } catch {
            throw errorsConst.invoiceErrors.queryErrors.findAllJobError;
        }
    },
    updateInvoiceSynchronizedJobQuery: async (where, update) => {
        try {
            return await InvoiceSchema.update(update, { where });
        } catch {
            throw errorsConst.invoiceErrors.queryErrors.updateJobError
        }
    }
}