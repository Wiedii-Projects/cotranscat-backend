// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const { encryptIdDataBase } = require("../../helpers/shared.helpers");

// Models
const TrackingStatus = require("./tracking-status.model");

module.exports = {
    createTrackingStatusQuery: async (trackingStatus) => {
        const { chronologicalPosition, name, description } = trackingStatus
        try {
            return await TrackingStatus.findOrCreate({
                where: {
                    chronologicalPosition,
                    name,
                },
                defaults: {
                    description
                },
            });
        } catch {
            throw errorsConst.trackingStatusErrors.queryErrors.createError
        }
    },
    findTrackingStatusByChronologicalPositionOfGroup: async (chronologicalPosition, name) => {
        try {
            const trackingStatusFound = await TrackingStatus.findOne({
                raw: true,
                where: { chronologicalPosition, name },
                attributes: ['id', 'name']
            })

            const { id, ...otherTrackingStatus } = trackingStatusFound

            return {
                id: encryptIdDataBase(id),
                otherTrackingStatus
            }
        } catch {
            throw errorsConst.trackingStatusErrors.queryErrors.findTrackingStatusByPositionOfGroupError
        }

    }
}