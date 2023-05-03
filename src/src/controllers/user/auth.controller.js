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
    const { user } = req.body;

    try {
      delete user.password;
      const token = await authHelpers.generateJWTHelper(user.id);
      return responseHelpers.responseSuccess(res, { ...user, token });
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
  createCode: async (req, res) => {
    const { user } = req.body;
    try {
      const id = sharedHelpers.decryptIdDataBase(user.id);
      await codeSMSQuery.deleteAllCodeQuery({ userCode: id });
      const code = await codeSmsHelpers.createSMSHelper(user.phoneNumber);
      await codeSMSQuery.createCodeIDQuery({ code, userCode: id });
      return responseHelpers.responseSuccess(res, { id: user.id });
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  validateCode: async (req, res) => {
    const { userCode } = req.body.validCode;
    try {
      await codeSMSQuery.deleteAllCodeQuery({ userCode });
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
