// Models
const { Bank } = require("../../models/index.models")

// Queries
const { sellerQuery } = require("../../models/index.queries")

module.exports = {
    getBankCodeAssociatedWithTheSeller: async (idSeller) => { 
        const [codeBankAssociated] = await sellerQuery.findSellerQuery({
            where: {id: idSeller},
            attribute: [],
            include: [
                {
                  model: Bank,
                  as: "BankSeller",
                }
            ]
        })
        const {BankSeller: {code: codeBank}} = codeBankAssociated

        return codeBank
     }   
}