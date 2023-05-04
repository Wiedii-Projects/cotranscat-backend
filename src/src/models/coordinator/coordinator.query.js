// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  Coordinator,
  User,
  IndicativeNumber,
  DocumentType,
} = require("../index.models");

// Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

module.exports = {
  createCoordinatorQuery: async (where, transaction) => {
    try {
      return await Coordinator.findOrCreate({
        where,
        transaction,
      });
    } catch {
      throw errorsConst.coordinator.queryErrors.createError;
    }
  },
  findCoordinatorQuery: async (where) => {
    try {
      return await Coordinator.findAll({
        where,
        attributes: ["id", "nickName", "email"],
        raw: true,
        nest: true,
        include: [
          {
            model: User,
            as: "UserCoordinator",
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
      }).then((coordinators) =>
      coordinators.map(
        ({
          UserCoordinator: { UserDocumentType, UserIndicativePhone, ...user },
          id,
          ...coordinator
        }) => {
          return {
            id: sharedHelpers.encryptIdDataBase(id),
            ...coordinator,
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
      throw errorsConst.coordinator.queryErrors.findError;
    }
  },
  updateCoordinatorQuery: async (where, update) => {
    try {
      return await Coordinator.update(update, { where });
    } catch {
      throw errorsConst.coordinator.queryErrors.updateError;
    }
  },
};
