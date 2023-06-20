// Constants
const { errorsConst } = require("../../../../constants/index.constants");

// Libraries
const { col } = require("sequelize");

// Models
const BankSchema = require("../../../../models/bank/bank.model");
const ClientSchema = require("../../../../models/client/client.model");
const DocumentTypeSchema = require("../../../../models/document-type/document-type.model");
const HeadquarterSchema = require("../../../../models/headquarter/headquarter.model");
const InvoiceSchema = require("../../../../models/invoice/invoice.model");
const PaymentMethodBankSchema = require("../../../../models/payment-method-bank/payment-method-bank.model");
const SellerSchema = require("../../../../models/seller/seller.model");
const UserSchema = require("../../../../models/user/user.model");

module.exports = {
    getInvoiceDetailsJobQuery: async (idSeller, idPaymentMethod) => {
        try {
            const [invoiceDetail] = await InvoiceSchema.findAll({
                raw: true,
                nest: true,
                attributes: [
                    [col('Invoice.number'), 'invoiceNumber'],
                    [col('Invoice.price'), 'invoicePrice'],
                    [col('InvoiceSeller->BankSeller->HeadquarterBank.name'), 'bankHeadquarterName'],
                    [col('InvoiceSeller->BankSeller->BankPaymentMethod.codePaymentMethod'), 'bankCodePaymentMethod'],
                    [col('InvoiceSeller->BankSeller.code'), 'bankCode'],
                    [col('InvoiceSeller.email'), 'sellerEmail'],
                    [col('InvoiceSeller->UserSeller.name'), 'sellerName'],
                    [col('InvoiceSeller->UserSeller.numberDocument'), 'sellerNumberDocument'],
                    [col('InvoiceSeller->UserSeller->UserDocumentType.code'), 'sellerDocumentType'],
                    [col('InvoiceClient->UserClient.name'), 'clientName'],
                    [col('InvoiceClient.email'), 'clientEmail'],
                    [col('InvoiceClient->UserClient.numberDocument'), 'clientNumberDocument'],
                    [col('InvoiceClient->UserClient->UserDocumentType.code'), 'clientDocumentType'],
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
                                        model: HeadquarterSchema,
                                        as: 'HeadquarterBank',
                                        attributes: []
                                    },
                                    {
                                        model: PaymentMethodBankSchema,
                                        as: 'BankPaymentMethod',
                                        where: { idPaymentMethod },
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
                    }
                ],
                where: {
                    '$InvoiceSeller.id$': idSeller
                }
            })

            return invoiceDetail
        } catch {
            throw errorsConst.invoiceErrors.queryErrors.findAllError;
        }
    }
}