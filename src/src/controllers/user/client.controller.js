// Helpers
const {
  responseHelpers,
  userHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");

// Models - Queries
const {
  clientQuery,
  userQuery,
  roleQuery,
} = require("../../models/index.queries");

// Constants
const roleModelConst = require("../../constants/model/role.model.const");

module.exports = {
  createClient: async (req, res) => {
    const { email = null, address = null, idMunicipality = null } = req.body;
    const extractUser = userHelpers.extractUserDataHelper(req.body);
    const extractClient = userHelpers.extractClientDataHelper({
      ...req.body,
      email,
      address,
      idMunicipality,
    });
    let transaction;
    try {
      const [{ id: role }] = await roleQuery.findRoleTypeQuery({
        where: { type: roleModelConst.CLIENT_ROLE }
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
        await clientQuery.createClientQuery(
          { ...extractClient, id: user.id },
          transaction
        );
        await transaction.commit();
        return responseHelpers.responseSuccess(res, sharedHelpers.encryptIdDataBase(user.id));
      }
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return responseHelpers.responseError(res, 500, error);
    }
  },
  updateClient: async (req, res) => {
    const { decryptId } = req.body;
    const { idDocumentType, numberDocument, ...extractUser } = userHelpers.extractUserDataHelper(req.body);
    const extractClient = userHelpers.extractClientDataHelper(req.body)
    let  userAlreadyExists;
    try {
      const [client] = await clientQuery.findClientQuery({ where: { id: decryptId }});
      if(client){
        if( idDocumentType && numberDocument ){
          const [{ id: role }] = await roleQuery.findRoleTypeQuery({
            where: { type: roleModelConst.CLIENT_ROLE }
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
          clientQuery.updateClientQuery({ id: decryptId }, extractClient)
        ])
      }
      return responseHelpers.responseSuccess(res, null);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  getAllClient: async (req, res) => {
    try {
      const client = await clientQuery.findClientQuery();

      const allClient = client.map(
        ({ 
          UserClient: { UserDocumentType, UserIndicativePhone, ...user }, 
          ClientIndicativeNumberWhatsApp, ClientMunicipality, id, ...client 
        }) => {
        return {
          id: sharedHelpers.encryptIdDataBase(id),
          ...client,
          ...user,
          indicativeNumberWhatsApp: {
            ...ClientIndicativeNumberWhatsApp,
            id: sharedHelpers.encryptIdDataBase(ClientIndicativeNumberWhatsApp.id)
          },
          municipality: ClientMunicipality.id ? {
            name: ClientMunicipality.name,
            idDepartment: sharedHelpers.encryptIdDataBase(ClientMunicipality.idDepartment),
            id: sharedHelpers.encryptIdDataBase(ClientMunicipality.id)
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

      return responseHelpers.responseSuccess(res, allClient);
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
