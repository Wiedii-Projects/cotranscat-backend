// Queries
const { shippingTypeQuery } = require("../../models/index.queries");

module.exports = {
    validateShippingType: async (req, where) => {
        try {
            const [shippingType] = await shippingTypeQuery.findShippingTypeQuery({ where });
            req.body.shippingType = shippingType;
        } catch (error) {
            req.body.shippingType = false;
        }
    }
}

