// Helpers
const { responseHelpers } = require("../../helpers/index.helpers");

// Libraries
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const {
  adminQuery,
  coordinatorQuery,
  driverQuery,
  sellerQuery,
} = require("../../models/index.queries");
const { ErrorModel } = require("../../models/index.models");
const { errorsConst } = require("../../constants/index.constants");

module.exports = {
  validateErrorFields: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHelpers.responseAllError(res, 400, errors.errors[0].msg);
    }
    next();
  },
  validateError: (req, res, next) => {
    const {
      errors: [error],
    } = validationResult(req);
    if (error) return responseHelpers.responseAllError(res, 400, error.msg);
    next();
  },
  userLoginAlreadyExist: async (nickName, email) => {
    if (nickName || email) {
      const [admin, coordinator, driver, seller] = await Promise.all([
        adminQuery.findAdminQuery({
          [Op.or]: [{ nickName }, { email }],
        }),
        coordinatorQuery.findCoordinatorQuery({
          [Op.or]: [{ nickName }, { email }],
        }),
        driverQuery.findDriverQuery({
          [Op.or]: [{ nickName }, { email }],
        }),
        sellerQuery.findSellerQuery({
          [Op.or]: [{ nickName }, { email }],
        }),
      ]);

      if ([...admin, ...coordinator, ...driver, ...seller].length)
        throw new ErrorModel(
          errorsConst.userErrors.emailOrNickNameAlreadyExist
        );
    }
  },
};
