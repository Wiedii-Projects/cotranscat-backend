// Helpers
const { responseHelpers } = require("../helpers/index.helpers");
const { sharedHelpers } = require("../helpers/index.helpers");

// Models - Queries
const { seatQuery } = require("../models/index.queries");

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
    try {
      await seatQuery.updateSeat({ id: req.body.seatExist.id }, { state: 2 });
      return responseHelpers.responseSuccess(res, null);
    } catch (error){
      return responseHelpers.responseError(res, 500, error);
    }
  },
  changeStateNotAvailable: async (req, res) => {
    try {
      await seatQuery.updateSeat({ id: req.body.seatExist.id }, { state: 1 });
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  }
};
