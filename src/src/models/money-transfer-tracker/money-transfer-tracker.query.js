// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

// Models
const MoneyTransferTracker = require("./money-transfer-tracker.model");

module.exports = {
    createMoneyTransferTrackerQuery: async (data, options) => {
        try {
            return await MoneyTransferTracker.create(data, options);
        } catch {
            throw errorsConst.moneyTransferTrackerErrors.queryErrors.createError
        }
    },
}