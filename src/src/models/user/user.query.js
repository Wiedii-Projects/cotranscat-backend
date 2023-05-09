// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  User,
  Role,
  DocumentType,
  IndicativeNumber,
} = require("./../index.models");

// Helpers
const { encryptIdDataBase } = require("../../helpers/shared.helpers");

module.exports = {
  findUserQuery: async (query = {}) => {
    try {
      const {
        where,
        attributes = [
          "id",
          "numberDocument",
          "name",
          "lastName",
          "numberPhone",
          "state",
        ],
        include = [
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
        group,
        limit,
        offset,
        order,
      } = query;
      return await User.findAll({
        where,
        attributes,
        raw: true,
        include,
        nest: true,
        group,
        order,
        limit,
        offset,
      }).then((users) =>
        users.map(
          ({
            id,
            UserDriver,
            UserAdmin,
            UserCoordinator,
            UserSeller,
            UserRole,
            UserDocumentType,
            UserIndicativePhone,
            ...user
          }) => ({
            id: encryptIdDataBase(id),
            role: {
              id: encryptIdDataBase(UserRole.id),
            },
            documentType: {
              ...UserDocumentType,
              id: encryptIdDataBase(UserDocumentType.id),
            },
            indicativeNumber: {
              ...UserIndicativePhone,
              id: encryptIdDataBase(UserIndicativePhone.id),
            },
            ...user,
          })
        )
      );
    } catch {
      throw errorsConst.userErrors.queryErrors.findAllError;
    }
  },
  findAndCountUserQuery: async (query) => {
    let {
      where,
      attributes = [
        "id",
        "idDocumentType",
        "numberDocument",
        "name",
        "lastName",
        "idIndicativePhone",
        "state",
        "idRole",
      ],
      group,
      limit,
      offset,
      order,
    } = query;
    try {
      return await User.findAndCountAll({
        where,
        attributes,
        raw: true,
        include: [
          {
            model: Role,
            as: "UserRole",
          },
        ],
        nest: true,
        group,
        order,
        offset,
        limit,
      }).then(({ rows, count }) => ({
        users: rows.map(({ UserRole, id, ...user }) => ({
          id: encryptIdDataBase(id),
          ...user,
          role: {
            ...UserRole,
            id: encryptIdDataBase(UserRole.id),
          },
        })),
        count,
      }));
    } catch {
      throw errorsConst.userErrors.queryErrors.findAllError;
    }
  },

  createNewUserQuery: async (where, transaction) => {
    try {
      return await User.findOrCreate({
        where,
        transaction,
      });
    } catch {
      throw errorsConst.userErrors.queryErrors.createError;
    }
  },
  updateUserQuery: async (where, update, transaction) => {
    try {
      return await User.update(update, {
        where,
        transaction,
      });
    } catch {
      throw errorsConst.userErrors.queryErrors.updateError;
    }
  },
};
