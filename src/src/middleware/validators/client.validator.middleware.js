// Queries
const { clientQuery } = require('./../../models/index.queries')

module.exports = {
    validateClient: async (req, where) => {
        try {
            const [client] = await clientQuery.findClientQuery({where});
            req.body.idClient = client;
        } catch {
            req.body.idClient = false;
        }
    }
}

