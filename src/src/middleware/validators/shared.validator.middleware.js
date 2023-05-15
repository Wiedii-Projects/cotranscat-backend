// Helpers
const { responseHelpers, sharedHelpers } = require("../../helpers/index.helpers");

// Libraries
const { validationResult } = require("express-validator");

const { userQuery } = require("../../models/index.queries");

// Models
const {
  Driver,
  Admin,
  Coordinator,
  Seller,
  Role,
  DocumentType,
  IndicativeNumber,
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
  emailOrNickNameExist: async (nickName, email, req) => {
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
        {
          model: Role,
          as: "UserRole",
        },
        {
          model: DocumentType,
          as: "UserDocumentType",
        },
        {
          model: IndicativeNumber,
          as: "UserIndicativePhone",
        },
      ],
    });

    let userAllData

    if (user) {
      const {
        id,
        UserDriver,
        UserAdmin,
        UserCoordinator,
        UserSeller,
        UserRole,
        UserDocumentType, 
        UserIndicativePhone,
        ...userData
      } = user

      userAllData = {
        id: sharedHelpers.encryptIdDataBase(id),
        role: {
          id: sharedHelpers.encryptIdDataBase(UserRole.id),
        },
        documentType: {
          ...UserDocumentType,
          id: sharedHelpers.encryptIdDataBase(UserDocumentType.id),
        },
        indicativeNumber: {
          ...UserIndicativePhone,
          id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id),
        },
        ...userData
      } 
    }
    req.body.user = userAllData;
  },
};
