// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const { Seat } = require("../index.models");

module.exports = {
    createSeat: async (data, transaction) => {
        try {
            return await Seat.create(data, {transaction})
        } catch {
            throw errorsConst.seatErrors.queryErrors.createError;
        }
    },
    updateSeat: async (update, where, transaction) => {
        try {
            return await Seat.update(update, { where, transaction });
        } catch {
            throw errorsConst.seatErrors.queryErrors.updateError
        }
    },
    findSeat: async (query = {}) => {
        try {
            const {  
                where, 
                attributes = ['id', 'row', 'column', 'price', 'state', 'name'],
                include = []
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
    },
    countSeat: async (query = {}) => {
        try {
            const {  
                where
            } = query;
            return Seat.count({ where })
        } catch {
            throw errorsConst.seatErrors.queryErrors.findAllError;
        }
    }
}