// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  User,
  Role,
  DocumentType,
  IndicativeNumber,
} = require("./../index.models");

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
      })
      
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
