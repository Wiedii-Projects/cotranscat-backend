// Queries
const { prefixQuery } = require("../../models/index.queries");

module.exports = {
    validateIsNewTNSPrefix: async (req, where) => {
        try {
            const [prefixFound] = await prefixQuery.findPrefixQuery(where);
            req.body.isNewTNSPrefix = prefixFound ? false : true;
        } catch {
            req.body.isNewTNSPrefix = false;
        }
    }
}