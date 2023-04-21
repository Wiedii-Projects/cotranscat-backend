// Queries
const { vehicleQuery } = require('./../../models/index.queries')

module.exports = {
    validateVehicle: async (req, query) => {
        try {
            const [vehicle] = await vehicleQuery.findVehicles(query)
            req.body.vehicle = vehicle
        } catch (error) {
            req.body.vehicle = true;
        }
    }
}