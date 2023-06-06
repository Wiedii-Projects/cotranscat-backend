// Helpers
const { responseHelpers } = require("../helpers/index.helpers");
const { sharedHelpers } = require("../helpers/index.helpers");

// Models - Queries
const { seatQuery } = require("../models/index.queries");
const { Sequelize } = require("sequelize");

module.exports = {
  getAllSeatTravel: async (req, res) => {
    const { idTravel } = req.body;
    try {
      const allSeat = await seatQuery.findSeat({ where: { idTravel } });
      const seats = allSeat.map(({ id, SeatClient, idTravel, idClient, ...seat }) => ({
        id: sharedHelpers.encryptIdDataBase(id),
        ...seat,
      }));
      return responseHelpers.responseSuccess(res, seats);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  changeStateToStandBy: async (req, res) => {
    const { idsSeat } = req.body;
    try {
      await seatQuery.updateSeat({ state: 2 }, { id: { [Sequelize.Op.or]: idsSeat } });
      return responseHelpers.responseSuccess(res, null);
    } catch (error){
      return responseHelpers.responseError(res, 500, error);
    }
  },
  changeStateToAvailable: async (req, res) => {
    const { idsSeat } = req.body;
    try {
      await seatQuery.updateSeat({ state: 0 }, { id: { [Sequelize.Op.or]: idsSeat } });
      return responseHelpers.responseSuccess(res, null);
    } catch (error){
      return responseHelpers.responseError(res, 500, error);
    }
  }
}; 
