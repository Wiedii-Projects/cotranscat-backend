// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

// Models
const ShipmentTracking = require("./shipment-tracking.model");
const TrackingStatus = require("./../tracking-status/tracking-status.model");

module.exports = {
    createShipmentTrackingQuery: async (data, options) => {
        try {
            return await ShipmentTracking.create(data, options);
        } catch {
            throw errorsConst.shipmentTrackingErrors.queryErrors.createError
        }
    },
    findShipmentTrackingByIdShipping: async (idShipping) => {
        try {
            const shipmentTrackingResponse = await ShipmentTracking.findAll({
                where: { idShipping },
                include: [
                    {
                        model: TrackingStatus,
                        as: "TrackingStatusShipmentTracking"
                    }
                ],
                raw: true,
                nest: true
            })

            return shipmentTrackingResponse.map(({
                id: shipmentTracking, date, time,
                TrackingStatusShipmentTracking: { id: trackingStatus, name, chronologicalPosition, description }
            }) => ({
                shipmentTracking: sharedHelpers.encryptIdDataBase(shipmentTracking), date, time,
                trackingStatus: sharedHelpers.encryptIdDataBase(trackingStatus), name, chronologicalPosition,
                description
            })
            )
        } catch {
            throw errorsConst.documentTypeErrors.queryErrors.findShipmentTrackingByIdInvoiceError
        }
    }
}