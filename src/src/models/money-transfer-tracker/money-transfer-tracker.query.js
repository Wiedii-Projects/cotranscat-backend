// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

// Models
const MoneyTransferTracker = require("./money-transfer-tracker.model");
const TrackingStatus = require("../tracking-status/tracking-status.model");

module.exports = {
    createMoneyTransferTrackerQuery: async (data, options) => {
        try {
            return await MoneyTransferTracker.create(data, options);
        } catch {
            throw errorsConst.moneyTransferTrackerErrors.queryErrors.createError
        }
    },
    findMoneyTransferTrackerByIdMoneyTransfer: async (idMoneyTransfer) => {
        try {
            const moneyTransferTrackerResponse = await MoneyTransferTracker.findAll({
                where: { idMoneyTransfer },
                include: [
                    {
                        model: TrackingStatus,
                        as: "MoneyTransferTrackerTrackingStatus"
                    }
                ],
                raw: true,
                nest: true
            })
            return moneyTransferTrackerResponse.map(({
                id, date, time,
                MoneyTransferTrackerTrackingStatus: { id: idTrackingStatus, name, chronologicalPosition, description }
            }) => ({
                id: sharedHelpers.encryptIdDataBase(id), date, time,
                trackingStatus: { id: sharedHelpers.encryptIdDataBase(idTrackingStatus), name, chronologicalPosition, description }
            })
            )
        } catch {
            throw errorsConst.moneyTransferTrackerErrors.queryErrors.findAllError
        }
    }
}