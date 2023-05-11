// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const { Seat, Client } = require("../index.models");

module.exports = {
    createSeat: async (data, transaction) => {
        try {
            return await Seat.create(data, {transaction})
        } catch {
            throw errorsConst.seatErrors.queryErrors.createError;
        }
    },
    updateSeat: async (where, update) => {
        try {
            return await Seat.update(update, { where });
        } catch {
            throw errorsConst.seatErrors.queryErrors.updateError
        }
    },
    findSeat: async (query = {}) => {
        try {
            const { 
                where,
                include = [
                    { 
                        model: Client, 
                        as: 'SeatClient'
                    },
                ]
            } = query;
            return await Seat.findAll({
                where,
                include,
                raw: true,
                nest: true
            });
        } catch {
            throw errorsConst.seatErrors.queryErrors.findAllError;
        }
    },
}