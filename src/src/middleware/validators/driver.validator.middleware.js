// Queries
const { driverQuery } = require('./../../models/index.queries')

module.exports = {
    validateDriver: async (req, where) => {
        try {
            const [driver] = await driverQuery.findDriverQuery(where);
            req.body.driver = driver
        } catch (error) {
            req.body.driver = false;
        }
    }
}

