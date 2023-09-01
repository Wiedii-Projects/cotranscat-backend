// Queries
const { driverVehicleQuery } = require('./../../models/index.queries')

module.exports = {
    validateDriverVehicle: async (req, where) => {
        try {
            const driverVehicle = await driverVehicleQuery.findOneDriverVehicleQuery({where});
            req.body.driverVehicle = driverVehicle
        } catch (error) {
            req.body.driverVehicle = false;
        }
    }
}

