// Queries
const { serviceTypeQuery } = require("../../models/index.queries");

module.exports = {
    validateServiceType: async (req, where) => {
        try {
            const [serviceType] = await serviceTypeQuery.findServiceTypeQuery(where);
            req.body.serviceType = serviceType;
        } catch {
            req.body.serviceType = false;
        }
    }
}