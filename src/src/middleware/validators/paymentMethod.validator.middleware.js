// Queries
const { paymentMethodQuery } = require('../../models/index.queries')

module.exports = {
    validatePaymentMethod: async (req, where) => {
        try {
            const [paymentMethod] = await paymentMethodQuery.findPaymentMethodQuery({ where });
            req.body.idPaymentMethod = paymentMethod? where.id : false;
        } catch (error) {
            req.body.idPaymentMethod = false;
        }
    }
}

