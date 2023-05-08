// Constants
const { errorsConst } = require("../../constants/index.constants");

//Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

// Models
const {
  Admin,
  IndicativeNumber,
  User,
  DocumentType,
} = require("../index.models");

module.exports = {
  createAdminQuery: async (where, transaction) => {
    try {
      return await Admin.findOrCreate({
        where,
        transaction,
      });
    } catch {
      throw errorsConst.adminErrors.queryErrors.createError;
    }
  },

  findAdminQuery: async (where) => {
    try {
      return await Admin.findAll({
        where,
        attributes: ["id", "nickName", "email"],
        raw: true,
        nest: true,
        include: [
          {
            model: User,
            as: "UserAdmin",
            attributes: [
              "numberDocument",
              "name",
              "lastName",
              "numberPhone",
              "state",
            ],
            include: [
              {
                model: DocumentType,
                as: "UserDocumentType",
              },
              {
                model: IndicativeNumber,
                as: "UserIndicativePhone",
              },
              {
                model: IndicativeNumber,
                as: "UserIndicativePhone",
              },
            ],
          },
        ],
      }).then((admins) =>
        admins.map(
          ({
            UserAdmin: { UserDocumentType, UserIndicativePhone, ...user },
            id,
            ...admin
          }) => {
            return {
              id: sharedHelpers.encryptIdDataBase(id),
              ...admin,
              ...user,
              documentType: {
                ...UserDocumentType,
                id: sharedHelpers.encryptIdDataBase(UserDocumentType.id),
              },
              indicativePhone: {
                ...UserIndicativePhone,
                id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id),
              },
            };
          }
        )
      );
    } catch {
      throw errorsConst.adminErrors.queryErrors.findError;
    }
  },

  updateAdminQuery: async (where, update) => {
    try {
      return await Admin.update(update, { where });
    } catch {
      throw errorsConst.adminErrors.queryErrors.updateError;
    }
  },
};
