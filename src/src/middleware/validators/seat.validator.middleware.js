

// Helpers
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
    }
}