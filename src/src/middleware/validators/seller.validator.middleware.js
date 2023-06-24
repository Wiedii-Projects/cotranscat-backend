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
    }
}

