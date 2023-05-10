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
    findSeat: async (query = {}) => {
        try {
            const { where } = query;
            return await Seat.findAll({
                where,
                include: [
                    { 
                        model: Client, 
                        as: 'SeatClient'
                    },
                ],
                raw: true,
                nest: true
            });
        } catch {
            throw errorsConst.seatErrors.queryErrors.findAllError;
        }
    },
}