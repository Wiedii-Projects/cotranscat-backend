// Helpers
const {
  userHelpers,
  sharedHelpers,
  authHelpers,
  responseHelpers
} = require("../../helpers/index.helpers");

// Models - Queries
const {
  roleQuery,
  userQuery,
  sellerQuery,
} = require("../../models/index.queries");

// Constants
const roleModelConst = require("../../constants/model/role.model.const");

module.exports = {
  createSeller: async (req, res) => {
    const extractUser = userHelpers.extractUserDataHelper(req.body);
    const { password, ...seller } = userHelpers.extractSellerDataHelper(
      req.body
    );
    let transaction;
    try {
      const [{ id: role }] = await roleQuery.findRoleTypeQuery({
        role: roleModelConst.ADMIN_ROLE,
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
        await sellerQuery.createSellerQuery(
          {
            ...seller,
            password: await authHelpers.encryptPasswordHelper(
              password
            ),
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

  getAllSeller: async (req, res) => {
    try {
      const resp = await sellerQuery.findSellerQuery();
      return responseHelpers.responseSuccess(res, resp);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },

  getSeller: async (req, res) => {
    const { decryptId } = req.body;
    try {
      const resp = await sellerQuery.findSellerQuery(decryptId);
      return responseHelpers.responseSuccess(res, resp);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
