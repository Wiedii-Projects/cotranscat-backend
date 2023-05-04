// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const {
  authHelpers,
  responseHelpers,
  codeSmsHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");

// Models - Queries
const { codeSMSQuery, userQuery } = require("../../models/index.queries");

module.exports = {
  login: async (req, res) => {
    try {
      // TODO: Implement work flow login
      // delete user.password;
      const token = await authHelpers.generateJWTHelper(
        "b663b33970219efab378dcfc92167144"
      );
      return responseHelpers.responseSuccess(res, {
        token: token,
        role: {
          name: 0,
        },
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
      const passwordEncrypt = await authHelpers.encryptPasswordHelper(password);
      await userQuery.updateUserQuery({ id }, { password: passwordEncrypt });
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
