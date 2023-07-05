// Queries
const { resolutionQuery } = require("../../models/index.queries");

module.exports = {
    validateIsNewDIANPrefix: async (req, where) => {
        try {
            const [resolutionFound] = await resolutionQuery.findResolutionQuery(where);
            req.body.isNewDIANPrefix = resolutionFound ? false : true;
        } catch {
            req.body.isNewDIANPrefix = false;
        }
    }
}