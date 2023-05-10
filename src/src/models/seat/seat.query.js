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
            const { 
                where, 
                attributes = ['id', 'row', 'column', 'price', 'state'],
                include = [
                    { 
                        model: Client, 
                        as: 'seatClient'
                    }
                ]
            } = query;
            
            return await Seat.findAll({
                where,
                attributes,
                include,
                raw: true,
                nest: true
            })
        } catch {
            throw errorsConst.seatErrors.queryErrors.findAllError;
        }
    }
}