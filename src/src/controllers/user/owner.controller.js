// Helpers
const {
  responseHelpers,
  userHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");

// Models - Queries
const {
  ownerQuery,
  userQuery,
  roleQuery,
} = require("../../models/index.queries");

// Constants
const roleModelConst = require("../../constants/model/role.model.const");

module.exports = {
  createOwner: async (req, res) => {
    const { email = null, address = null, idMunicipalityOfResidence = null } = req.body;
    const extractUser = userHelpers.extractUserDataHelper(req.body);
    const extractOwner = userHelpers.extractOwnerDataHelper({
      ...req.body,
      email,
      address,
      idMunicipalityOfResidence,
    });
    let transaction;
    try {
      const [{ id: role }] = await roleQuery.findRoleTypeQuery({
        where: { type: roleModelConst.OWNER_ROLE }
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
        const owner = await ownerQuery.createOwnerQuery(
          { ...extractOwner, id: user.id },
          transaction
        );
        await transaction.commit();
        return responseHelpers.responseSuccess(res, sharedHelpers.encryptIdDataBase(user.id));
      }
      return responseHelpers.responseSuccess(res, userAlreadyExists?.id);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return responseHelpers.responseError(res, 500, error);
    }
  },
  updateOwner: async (req, res) => {
    const { decryptId } = req.body;
    const { idDocumentType, numberDocument, ...extractUser } = userHelpers.extractUserDataHelper(req.body);
    const extractOwner = userHelpers.extractOwnerDataHelper(req.body)
    let  userAlreadyExists;
    try {
      const [owner] = await ownerQuery.findOwnerQuery({ where: { id: decryptId }});
      if(owner){
        if( idDocumentType && numberDocument ){
          const [{ id: role }] = await roleQuery.findRoleTypeQuery({
            where: { type: roleModelConst.OWNER_ROLE }
          });
          const idRole = sharedHelpers.decryptIdDataBase(role);
          [userAlreadyExists] = await userQuery.findUserQuery({
            where: {
              idDocumentType: idDocumentType,
              numberDocument: numberDocument,
              idRole,
            },
          });
        }
        await Promise.all([
          userAlreadyExists ? 
              userQuery.updateUserQuery({ id: decryptId }, extractUser) : 
              userQuery.updateUserQuery({ id: decryptId }, { idDocumentType, numberDocument, ...extractUser }),
          ownerQuery.updateOwnerQuery({ id: decryptId }, extractOwner)
        ])
      }
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  getAllOwner: async (req, res) => {
    try {
      const owner = await ownerQuery.findOwnerQuery();

      const allOwner = owner.map(
        ({ 
          UserOwner: { UserDocumentType, UserIndicativePhone, ...user }, 
          IndicativeNumberOwner, MunicipalityOwner, id, ...owner 
        }) => {
        return {
          id: sharedHelpers.encryptIdDataBase(id),
          ...owner,
          ...user,
          indicativeNumberWhatsApp: {
            ...IndicativeNumberOwner,
            id: sharedHelpers.encryptIdDataBase(IndicativeNumberOwner.id)
          },
          municipality: MunicipalityOwner.id ? {
            name: MunicipalityOwner.name,
            idDepartment: sharedHelpers.encryptIdDataBase(MunicipalityOwner.idDepartment),
            id: sharedHelpers.encryptIdDataBase(MunicipalityOwner.id)
          } : null,
          documentType: {
            ...UserDocumentType,
            id: sharedHelpers.encryptIdDataBase(UserDocumentType.id)
          },
          indicativePhone: {
            ...UserIndicativePhone,
            id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id)
          }
        }
      })

      return responseHelpers.responseSuccess(res, allOwner);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
