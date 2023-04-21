// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { SeatRuler } = require('./../index.models');

// Helpers
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {
    createSeatRuler: async (values, options = {}) => {
        try {
            return await SeatRuler.create(values, options)
        } catch {
            throw errorsConst.seatRuler.queryErrors.createdError;
        }
    },
    getSeatRulers: async (query = {}) => {
        try {
            const { 
                where,
                attributes = ['id', 'name', 'row', 'column'],
            } = query;
            return await SeatRuler.findAll({
                where,
                attributes,
                raw: true
            }).then(seatRulers => seatRulers.map(({ id, ...seatRuler }) => ({
                id: encryptIdDataBase(id),
                ...seatRuler
            })))
        } catch (error) {
            throw errorsConst.seatRuler.queryErrors.findError;
        }
    },
}