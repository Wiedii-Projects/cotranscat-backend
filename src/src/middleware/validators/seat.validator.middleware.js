

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');
const { seatQuery } = require('../../models/index.queries')
const { Sequelize } = require("sequelize");

module.exports = {
    validateSeat: async (value, req) => {
        try {
            const idsSeat = value.map( data => sharedHelpers.decryptIdDataBase(data));
            const seatsExist = await seatQuery.findSeat({ 
                where: { 
                    id: {
                        [Sequelize.Op.or]: idsSeat,
                    },
                } 
            });
            req.body.seatsExist = idsSeat.length == seatsExist.length;
            req.body.idsSeat = idsSeat;
        } catch {
            req.body.idsSeat = false;
        }
    },
    validateArraySeat: async (id, req) => {
        try {
            req.body.seatExist = req.body.seatExist ? req.body.seatExist : [];
            req.body.price = req.body.price ? req.body.price : 0;
            const [seat] = await seatQuery.findSeat({ where: { id: sharedHelpers.decryptIdDataBase(id), state: 2 } });
            req.body.price += parseFloat(seat.price);
            req.body.seatExist = [ ...req.body.seatExist, seat?true:false ];
        } catch {
            req.body.seatExist = [false];
        }
    }
}