// Queries
const { sharedHelpers } = require("../../helpers/index.helpers");
const { bankQuery } = require("../../models/index.queries");

module.exports = {
    validateBank: async (req, where) => {
        try {
            const [bankFound] = await bankQuery.findBankQuery(where);
            req.body.bank = bankFound
        } catch {
            req.body.bank = false;
        }
    },
    validateBankAssociatedByHeadquarter: async (req, codeBank) => {
        const { headquarter: { id } } = req.body;
        try {
            const bankAssociatedByHeadquarter = await bankQuery.findBankAssociatedByHeadquarterQuery(codeBank, sharedHelpers.decryptIdDataBase(id));
            req.body.isValidBankAssociatedByHeadquarter = bankAssociatedByHeadquarter.id ? true : false
        } catch {
            req.body.isValidBankAssociatedByHeadquarter = false;
        }
    }
}