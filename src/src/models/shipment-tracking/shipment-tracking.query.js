// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const ShipmentTracking = require("./shipment-tracking.model");

module.exports = {
    createShipmentTrackingQuery: async (data, transaction) => {
        try {
            return await ShipmentTracking.create(data, { transaction });
        } catch (e){
            console.log(e)
            throw errorsConst.shipmentTrackingErrors.queryErrors.createError
        }
    }
}