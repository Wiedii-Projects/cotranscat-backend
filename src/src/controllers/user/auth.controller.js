// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const {
  authHelpers,
  responseHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");

// Models - Queries
const { userQuery } = require("../../models/index.queries");

module.exports = {
  login: async (req, res) => {
    const { user: { password, ...user} } = req.body;
    try {
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
