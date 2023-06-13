// Models
const { Bank, Headquarter, PaymentMethodBank } = require("../../models/index.models")

// Queries
const { sellerQuery } = require("../../models/index.queries")

module.exports = {
    getBankByPaymentMethodAssociatedWithTheSellerHelper: async (idSeller, idPaymentMethod) => {
        const [codeBankAssociated] = await sellerQuery.findSellerQuery({
            where: { id: idSeller },
            attribute: [],
            include: [
                {
                    model: Bank,
                    as: "BankSeller",
                    include: [{
                        model: Headquarter,
                        as: "HeadquarterBank"
                    },
                    {
                        model: PaymentMethodBank,
                        attributes: ['codePaymentMethod'],
                        as: 'BankPaymentMethod',
                        where: { idPaymentMethod }
                    }
                    ]

                }

            ]
        })

        const {
            BankSeller: {
                code: codeBank,
                BankPaymentMethod: { codePaymentMethod },
                HeadquarterBank: { name: headquarter }
            }
        } = codeBankAssociated

        return {
            codeBank,
            codePaymentMethod,
            headquarter
        }
    }
}