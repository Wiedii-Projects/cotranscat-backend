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
  vehicleQuery,
  driverVehicleQuery,
} = require("../../models/index.queries");

// Constants
const roleModelConst = require("../../constants/model/role.model.const");
const { errorsConst } = require("../../constants/index.constants");
const { Op } = require("sequelize");

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
    const { offset = 0 } = req.query;
    try {
      const drivers = await driverQuery.findDriverQuery({
        offset: offset * 20
      });
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

  inactiveDriver: async (req, res) => {
    const { driver: { state }, decryptId: id } = req.body;
    try {
      await driverQuery.updateDriver({ state: !state }, { id });
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },

  assignVehicle: async (req, res) => {
    const { idDriver, idVehicle } = req.body;
    try {
      const [driverExist, vehicleExist] = await Promise.all([
        driverQuery.findOneDriverQuery({ where: { id: idDriver } }),
        vehicleQuery.findOneVehicleQuery({ where: { id: idVehicle } })
      ]);
      if (driverExist && vehicleExist) {
        const driverAlreadyAssigned = await driverVehicleQuery.findOneDriverVehicleQuery({
          where: {
            [Op.or]: [
              { "idDriver": idDriver },
              { "idVehicle": idVehicle }
            ],
          }
        });
        if( driverAlreadyAssigned ) return responseHelpers.responseError(res, 400, errorsConst.driverErrors.driverAlreadyAssigned)
        await driverVehicleQuery.createDriverVehicle({ idDriver, idVehicle });
        return responseHelpers.responseSuccess(res, null);
      }
      return driverExist ? responseHelpers.responseError(res, 400, errorsConst.vehicleErrors.vehicleDoesNotExist) :
        responseHelpers.responseError(res, 400, errorsConst.driverErrors.driverNotExist);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  getDriverAvailableWithVehicle: async (req, res) => {
    try {
      const drivers = await driverQuery.findDriverAvailableWithVehicleQuery({where: { isDriverDefault: false }});
      return responseHelpers.responseSuccess(res, drivers);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  }
};
