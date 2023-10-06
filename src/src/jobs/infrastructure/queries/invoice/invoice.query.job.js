// Constants
const { errorsConst } = require("../../../../constants/index.constants");

// Libraries
const { col, Op, where } = require("sequelize");

// Models
const BankSchema = require("../../../../models/bank/bank.model");
const ClientSchema = require("../../../../models/client/client.model");
const DocumentTypeSchema = require("../../../../models/document-type/document-type.model");
const InvoiceSchema = require("../../../../models/invoice/invoice.model");
const PaymentMethodBankSchema = require("../../../../models/payment-method-bank/payment-method-bank.model");
const SellerSchema = require("../../../../models/seller/seller.model");
const UserSchema = require("../../../../models/user/user.model");
const ServiceTypeSchema = require("../../../../models/service-type/service-type.model");
const PaymentMethodSchema = require("../../../../models/payment-method/payment-method.model");
const ResolutionSchema = require("../../../../models/resolution/resolution.model");
const PrefixSchema = require("../../../../models/prefix/prefix.model");
const sharedHelpers = require("../../../../helpers/shared.helpers");

module.exports = {
    getInvoicesDetailsNotSynchronizedJobQuery: async () => {
        try {
            const invoicesDetails = await InvoiceSchema.findAll({
                raw: true,
                nest: true,
                attributes: [
                    [col('Invoice.synchronizationType'), 'synchronizationType'],
                    [col('Invoice.codeSale'), 'codeSale'],
                    [col('Invoice.id'), 'key'],
                    [col('ResolutionInvoice->PrefixResolution.code'), 'codePrefix'],
                    [col('InvoiceServiceType.code'), 'codeTypeService'],
                    [col('Invoice.number'), 'invoiceNumber'],
                    [col('Invoice.price'), 'invoicePrice'],
                    [col('InvoicePaymentMethod->PaymentMethodBank.codePaymentMethod'), 'bankCodePaymentMethod'],
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
                                attributes: []
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
                    },
                    {
                        model: PaymentMethodSchema,
                        as: 'InvoicePaymentMethod',
                        attributes: [],
                        include: [
                            {
                                model: PaymentMethodBankSchema,
                                as: 'PaymentMethodBank',
                                attributes: []
                            }
                        ]
                    },
                    {
                        model: ResolutionSchema,
                        as: 'ResolutionInvoice',
                        attributes: [],
                        include: [
                            {
                                model: PrefixSchema,
                                as: 'PrefixResolution',
                                attributes: []
                            }
                        ]
                    }
                ],
                where: {
                    isSynchronized: false,
                    [Op.and]: [
                      where(col('InvoicePaymentMethod.PaymentMethodBank.idBank'), '=', col('InvoiceSeller.idBank'))
                    ]
                }
            })
            
            const invoicesNotSynchronized = invoicesDetails.map(({ invoiceNumber, key,  ...otherData }) => {
                return {
                    invoiceNumber: parseInt(invoiceNumber),
                    key: sharedHelpers.encryptIdDataBase(key),
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