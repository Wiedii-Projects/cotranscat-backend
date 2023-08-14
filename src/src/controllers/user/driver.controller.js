// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Helpers
const {
  responseHelpers,
  userHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");

// Models - Queries
const {
  userQuery,
  roleQuery,
  driverQuery,
} = require("../../models/index.queries");

// Constants
const roleModelConst = require("../../constants/model/role.model.const");
const { errorsConst } = require("../../constants/index.constants");

module.exports = {
  createDriver: async (req, res) => {
    const extractUser = userHelpers.extractUserDataHelper(req.body);
    const extractDriver = userHelpers.extractDriverDataHelper(req.body);
    let transaction;
    try {
      const [{ id: role }] = await roleQuery.findRoleTypeQuery({
        where: { type: roleModelConst.DRIVER_ROLE },
      });
      const idRole = sharedHelpers.decryptIdDataBase(role);
      const [userAlreadyExists] = await userQuery.findUserQuery({
        where: {
          idDocumentType: extractUser.idDocumentType,
          numberDocument: extractUser.numberDocument,
          idRole,
        },
      });
      if (!userAlreadyExists?.id) {
        transaction = await sharedHelpers.initTransaction();
        const [user] = await userQuery.createNewUserQuery(
          { ...extractUser, idRole },
          transaction
        );
        await driverQuery.createDriver(
          {
            id: user.id,
            ...extractDriver,
          },
          transaction
        );
        await transaction.commit();
        return responseHelpers.responseSuccess(res, null);
      }
      return responseHelpers.responseError(res, 500, errorsConst.driverErrors.driverAlreadyExist);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return responseHelpers.responseError(res, 500, error);
    }
  },

  getAllDrivers: async (req, res) => {
    try {
      const drivers = await driverQuery.findDriverQuery();
      return responseHelpers.responseSuccess(res, drivers);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },

  getDriver: async (req, res) => {
    const { driver } = req.body;
    try {
      return responseHelpers.responseSuccess(res, driver);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },

  updateDriver: async (req, res) => {
    const { decryptId: id } = req.body;
    const userData = userHelpers.extractUserDataHelper(req.body);
    const { password, ...driverData } = userHelpers.extractDriverDataHelper(req.body);
    let transaction;
    try {
      transaction = await dbConnectionOptions.transaction();

      await Promise.all([
        userQuery.updateUserQuery({ id }, userData, transaction),
        driverQuery.updateDriver(driverData, { id }, transaction),
      ]);

      await transaction.commit();
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
