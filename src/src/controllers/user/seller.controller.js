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
    const extractSeller = userHelpers.extractSellerDataHelper(
      req.body
    );
    let transaction;
    try {
      const [{ id: role }] = await roleQuery.findRoleTypeQuery({
        where: { type: roleModelConst.SELLER_ROLE }
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
            ...extractSeller,
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
      const sellers = await sellerQuery.findSellerQuery();
      const allSeller = sellers.map(
        ({
          UserSeller: { UserDocumentType, UserIndicativePhone, ...user },
          id,
          ...seller
        }) => {
          return {
            id: sharedHelpers.encryptIdDataBase(id),
            ...seller,
            ...user,
            documentType: {
              ...UserDocumentType,
              id: sharedHelpers.encryptIdDataBase(UserDocumentType.id),
            },
            indicativePhone: {
              ...UserIndicativePhone,
              id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id),
            },
          };
        }
      )
      return responseHelpers.responseSuccess(res, allSeller);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },

  getSeller: async (req, res) => {
    const { decryptId } = req.body;
    try {
      const [sellerFound] = await sellerQuery.findSellerQuery({where: {id: decryptId}});
      
      const {
        UserSeller: { UserDocumentType, UserIndicativePhone, ...user },
        id,
        ...seller
      } = sellerFound

      const sellerResponse = {
        id: sharedHelpers.encryptIdDataBase(id),
        ...seller,
        ...user,
        documentType: {
          ...UserDocumentType,
          id: sharedHelpers.encryptIdDataBase(UserDocumentType.id),
        },
        indicativePhone: {
          ...UserIndicativePhone,
          id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id),
        }
      }
      return responseHelpers.responseSuccess(res, sellerResponse);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
