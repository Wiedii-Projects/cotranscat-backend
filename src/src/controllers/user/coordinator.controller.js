// Constants
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Helpers
const indexHelpers = require("../../helpers/index.helpers");
const { responseHelpers } = require("../../helpers/index.helpers");

// Models - Queries
const {
  coordinatorQuery,
  userQuery,
  roleQuery,
} = require("../../models/index.queries");

module.exports = {
  createCoordinator: async (req, res) => {
    const userExtract = indexHelpers.userHelpers.extractUserDataHelper(
      req.body
    );
    const { password, ...coordinator } =
      indexHelpers.userHelpers.extractCoordinatorDataHelper(req.body);
    let transaction;
    try {
      transaction = await dbConnectionOptions.transaction();
      //TODO Adjust Role
      const [role] = await roleQuery.findRoleQuery({
        role: "COORDINATOR_ROLE",
      });
      const [user] = await userQuery.createNewUserQuery(
        { ...userExtract, idRole: role.id },
        transaction
      );
      await coordinatorQuery.createCoordinatorQuery(
        {
          ...coordinator,
          password: await indexHelpers.authHelpers.encryptPasswordHelper(
            password
          ),
          id: user.id,
        },
        transaction
      );
      await transaction.commit();
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return responseHelpers.responseError(res, 500, error);
    }
  },
  getAllCoordinator: async (req, res) => {
    try {
      const resp = await coordinatorQuery.findCoordinatorQuery();
      return responseHelpers.responseSuccess(res, resp);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  getCoordinator: async (req, res) => {
    const { decryptId } = req.body;
    try {
      const resp = await coordinatorQuery.findCoordinatorQuery(decryptId);
      return responseHelpers.responseSuccess(res, resp);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  updateCoordinator: async (req, res) => {
    const { decryptId: id, ...user } = req.body;
    const userExtract = indexHelpers.userHelpers.extractUserDataHelper(user);
    const coordinator =
      indexHelpers.userHelpers.extractCoordinatorDataHelper(user);

    try {
      await Promise.all([
        coordinatorQuery.updateCoordinatorQuery({ id }, coordinator),
        userQuery.updateUserQuery({ id }, userExtract),
      ]);
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
