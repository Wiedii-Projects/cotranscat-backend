// Helpers
const {
  responseHelpers,
  userHelpers,
  sharedHelpers,
  authHelpers,
} = require("../../helpers/index.helpers");

// Models - Queries
const {
  adminQuery,
  roleQuery,
  userQuery,
} = require("../../models/index.queries");

// Constants
const roleModelConst = require("../../constants/model/role.model.const");

module.exports = {
  createAdmin: async (req, res) => {
    const extractUser = userHelpers.extractUserDataHelper(req.body);
    const extractAdmin = userHelpers.extractAdminDataHelper(req.body);
    let transaction;
    try {
      const [{ id: role }] = await roleQuery.findRoleTypeQuery({
        where: { type: roleModelConst.ADMIN_ROLE },
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
        await adminQuery.createAdminQuery(
          {
            ...extractAdmin,
            id: user.id,
          },
          transaction
        );
        await transaction.commit();
      }
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return responseHelpers.responseError(res, 500, error);
    }
  },

  getAllAdmin: async (req, res) => {
    try {
      const admin = await adminQuery.findAdminQuery();
      return responseHelpers.responseSuccess(res, admin);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },

  getAdmin: async (req, res) => {
    const { decryptId } = req.body;
    try {
      const resp = await adminQuery.findAdminQuery(decryptId);
      return responseHelpers.responseSuccess(res, resp);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },

  updateAdmin: async (req, res) => {
    const { decryptId, name } = req.body;
    try {
      await adminQuery.updateAdminQuery({ id: decryptId }, { name });
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
