// Helpers
const { responseHelpers } = require("../helpers/index.helpers");
const { sharedHelpers } = require("../helpers/index.helpers");

// Models - Queries
const { seatQuery } = require("../models/index.queries");

module.exports = {
  getAllSeatTravel: async (req, res) => {
    const { idTravel } = req.body;
    try {
      const seat = await seatQuery.findSeat({ where: { idTravel } });
      const test = seat.map(({ id, SeatClient, idTravel, idClient, ...seat }) => ({
        id: sharedHelpers.encryptIdDataBase(id),
        ...seat,
      }));
      return responseHelpers.responseSuccess(res, test);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
