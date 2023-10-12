// Queries
const { sellerQuery } = require('./../../models/index.queries')

module.exports = {
    validateSeller: async (req, where) => {
        try {
            const [seller] = await sellerQuery.findSellerQuery({where});
            req.body.idSeller = seller;
        } catch {
            req.body.idSeller = false;
        }
    },
    validateSellerAndBankAssociated: async (req, where) => {
        try {
            const sellerBankAssociated = await sellerQuery.findSellerBankAssociatedQuery(where);
            if (sellerBankAssociated) {
                req.body.bankAssociatedBySeller = {
                    seller: {
                        id: sellerBankAssociated.id,
                        nickName: sellerBankAssociated.nickName,
                        email: sellerBankAssociated.email
                    },
                    bank: {
                        id: sellerBankAssociated.BankSeller.id,
                        code: sellerBankAssociated.BankSeller.code,
                        idMunicipality: sellerBankAssociated.BankSeller.idMunicipality
                    }
                }
            } else {
                req.body.bankAssociatedBySeller = false
            }
        } catch {
            req.body.bankAssociatedBySeller = false;
        }
    }
}

