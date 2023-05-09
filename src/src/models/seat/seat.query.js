// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const { Seat } = require("../index.models");

module.exports = {
    createSeat: async (data, transaction) => {
        try {
            return await Seat.create(data, {transaction})
        } catch (err) {
            console.log(err)
            throw errorsConst.seatErrors.queryErrors.createError;
        }
    },
}