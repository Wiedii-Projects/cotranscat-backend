

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');
const { seatQuery } = require('../../models/index.queries')

module.exports = {
    validateSeat: async (id, req) => {
        try {
            const [seat] = await seatQuery.findSeat({ where: { id }, include: []});
            req.body.seatExist = seat;
            req.body.idSeat = id;
        } catch {
            req.body.idSeat = false;
        }
    },
    validateArraySeat: async (id, req) => {
        try {
            req.body.seatExist = req.body.seatExist ? req.body.seatExist : [];
            const [seat] = await seatQuery.findSeat({ where: { id: sharedHelpers.decryptIdDataBase(id), state: 2 } });
            req.body.seatExist = [ ...req.body.seatExist, seat?true:false ];
        } catch {
            req.body.seatExist = [false];
        }
    }
}