// Helpers
const { responseHelpers } = require("../../helpers/index.helpers");

// Libraries
const { validationResult } = require("express-validator");

const {
  adminQuery,
  coordinatorQuery,
  driverQuery,
  sellerQuery,
  userQuery,
} = require("../../models/index.queries");
const { ErrorModel } = require("../../models/index.models");
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  Driver,
  Admin,
  Coordinator,
  Seller,
} = require("../../models/index.models");

const { Op, col, fn, literal } = require("sequelize");

module.exports = {
  validateError: (req, res, next) => {
    const {
      errors: [error],
    } = validationResult(req);
    if (error) return responseHelpers.responseAllError(res, 400, error.msg);
    next();
  },
  userLoginAlreadyExist: async (nickName, email) => {
    if (nickName || email) {
      const [user] = await userQuery.findUserQuery({
        attributes: [
          [
            fn(
              "COALESCE",
              col("UserDriver.nickName"),
              col("UserAdmin.nickName"),
              col("UserCoordinator.nickName"),
              col("UserSeller.nickName")
            ),
            "nickName",
          ],
          [
            fn(
              "COALESCE",
              col("UserDriver.email"),
              col("UserAdmin.email"),
              col("UserCoordinator.email"),
              col("UserSeller.email")
            ),
            "email",
          ],
          [
            fn(
              "COALESCE",
              col("UserDriver.password"),
              col("UserAdmin.password"),
              col("UserCoordinator.password"),
              col("UserSeller.password")
            ),
            "password",
          ],
          [
            fn(
              "COALESCE",
              col("UserDriver.id"),
              col("UserAdmin.id"),
              col("UserCoordinator.id"),
              col("UserSeller.id")
            ),
            "id",
          ],
          "numberDocument",
          "name",
          "lastName",
          ["phoneNumber", "numberPhone"],
          "state",
        ],
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { "$UserDriver.id$": { [Op.not]: null } },
                { "$UserAdmin.id$": { [Op.not]: null } },
                { "$UserCoordinator.id$": { [Op.not]: null } },
                { "$UserSeller.id$": { [Op.not]: null } },
              ],
            },
            {
              [Op.or]: [
                literal(
                  `COALESCE(UserDriver.nickName, UserAdmin.nickName, UserCoordinator.nickName, UserSeller.nickName) = '${nickName}'`
                ),
                literal(
                  `COALESCE(UserDriver.email, UserAdmin.email, UserCoordinator.email, UserSeller.email) = '${email}'`
                ),
              ],
            },
          ],
        },
        include: [
          {
            model: Driver,
            as: "UserDriver",
            required: false,
          },
          {
            model: Admin,
            as: "UserAdmin",
            required: false,
          },
          {
            model: Coordinator,
            as: "UserCoordinator",
            required: false,
          },
          {
            model: Seller,
            as: "UserSeller",
            required: false,
          },
        ],
      });
      if (user)
        throw new ErrorModel(
          errorsConst.userErrors.emailOrNickNameAlreadyExist
        );
    }
  },
};
