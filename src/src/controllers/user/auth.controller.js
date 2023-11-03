// Helpers
const { Op, col, Sequelize } = require("sequelize");
const { TYPE_SERVICE } = require("../../constants/core/sales.const");
const {
  authHelpers,
  responseHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");
const { decryptIdDataBase } = require("../../helpers/shared.helpers");

// Models - Queries
const { userQuery } = require("../../models/index.queries");
const { findAllTravelJHOANInvoiceQuery, findInvoiceQuery } = require("../../models/invoice/invoice.query");
const { findServiceTypeQuery } = require("../../models/service-type/service-type.query");
const { findOneTravel } = require("../../models/travel/travel.query");

module.exports = {
  login: async (req, res) => {
    const { user: { password, ...user} } = req.body;
    try {

      const [ { type: valueConventionServiceType }] = await findServiceTypeQuery({ where: { id: 2} });

      
      if (valueConventionServiceType === TYPE_SERVICE.PASSAGE.VALUE_CONVENTION) {
          console.log("fino")
          let whereInvoice = {
            [Op.and]: [
                Sequelize.where(col('Invoice.id'), '=', 1),
                Sequelize.where(col('TicketInvoice.TicketSeat.TravelSeat.date'), '>=', new Date('2023-11-01')),
                Sequelize.where(col('TicketInvoice.TicketSeat.TravelSeat.time'), '>=', '14:00:00'),
            ]
        };
          const [test] = await findAllTravelJHOANInvoiceQuery({ where: whereInvoice})
          // console.log(test)
          console.log(JSON.stringify(test, null, 4))

          if(test &&  test.TicketInvoice.length !== 0) {
            test.TicketInvoice.forEach(element => {
              console.log(element.TicketSeat.id)
            });
          }

          // const testt = await findOneTravel({
          //   where: {
          //     [Op.and]: [
          //       { date: { [Op.gte]: new Date('2023-11-01') } },
          //       { time: { [Op.gte]: '13:00:00' } },
          //       { id: 2 }
          //     ]
          //   }
          // })
          // console.log("testt", testt)
      }

      const token = await authHelpers.generateJWTHelper(user.id);
      return responseHelpers.responseSuccess(res, {
        token: token,
        user
      });
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  validateEmail: async (req, res) => {
    const { user } = req.body;
    return responseHelpers.responseSuccess(res, user?.state ? true : false);
  },
  changePassword: async (req, res) => {
    const { password, user } = req.body;

    try {
      const id = sharedHelpers.decryptIdDataBase(user.id);
      await userQuery.updateUserQuery({ id }, { password });
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
