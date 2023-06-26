// Queries
const { clientQuery } = require('./../../models/index.queries')

module.exports = {
    validateClient: async (req, where, nameProperty) => {
        try {
            const [client] = await clientQuery.findClientQuery({where});
            req.body[nameProperty] = client;
        } catch {
            req.body[nameProperty] = false;
        }
    }
}

