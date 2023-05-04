// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const {
  responseHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");

// Models - Queries
const { userQuery } = require("../../models/index.queries");

module.exports = {
  deleteUser: async (req, res) => {
    const { user } = req.body;
    try {
      const id = sharedHelpers.decryptIdDataBase(user.id);
      const [update] = await userQuery.updateUserQuery(
        { id },
        { state: false }
      );
      return update
        ? responseHelpers.responseSuccess(res, null)
        : responseHelpers.responseError(
            res,
            400,
            errorsConst.userErrors.userNoDelete
          );
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
