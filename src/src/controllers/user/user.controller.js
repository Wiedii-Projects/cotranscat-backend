// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const {
  responseHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");

// Libraries
const unicodeNormalizerLibrary = require('unorm')
const { col, fn, where, Op } = require("sequelize");

// Models - model
const { IndicativeNumber, DocumentType, Client, Municipality, Department } = require("../../models/index.models");

// Models - Queries
const { userQuery } = require("../../models/index.queries");

module.exports = {
  deleteUser: async (req, res) => {
    const { user } = req.body;
    try {
      const id = sharedHelpers.decryptIdDataBase(user.id);
      const [update] = await userQuery.updateUserQuery(
        { id },
        { state: false }
      );
      return update
        ? responseHelpers.responseSuccess(res, null)
        : responseHelpers.responseError(
            res,
            400,
            errorsConst.userErrors.userNoDelete
          );
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  searchUsers: async (req, res) => {

    let { filterValue } = req.body;

    if (isNaN(filterValue)) 
      filterValue = filterValue ? (unicodeNormalizerLibrary.nfd(filterValue).replace(/[\u0300-\u036f]/g, "")).toLowerCase() : null;

    try {
      const usersFound = await userQuery.findUserQuery({
        where: {
          [Op.or]: [
            {
              name: where(
                fn('LOWER', col('User.name')),
                'LIKE',
                `%${filterValue}%`
              )
            },
            {
              lastName: where(
                fn('LOWER', col('User.lastName')),
                'LIKE',
                `%${filterValue}%`
              )
            },
            {
              numberDocument: {
                [Op.like]: `%${filterValue}%`
              }
            }
          ]
        },
        include: [
          {
            model: IndicativeNumber,
            as: "UserIndicativePhone"
          },
          {
            model: DocumentType,
            as: "UserDocumentType"
          },
          {
            model: Client,
            as: "UserClient",
            required: false,
            include: [
              {
                model: IndicativeNumber,
                as: "ClientIndicativeNumberWhatsApp",
                required: false
              },
              {
                model: Municipality,
                as: "ClientMunicipality",
                required: false,
                include: [
                  {
                    model: Department,
                    as: "MunicipalityDepartment",
                    required: false
                  }
                ]
              }
            ]
          }
        ]
      })
      const users = usersFound.map(
        ({
          id, numberDocument, name, lastName, UserDocumentType, UserIndicativePhone, numberPhone, 
          UserClient :{numberPhoneWhatsapp, email, address, ClientIndicativeNumberWhatsApp, ClientMunicipality },
          ...user
        }) => {

          let municipality = null
          let department = null

          if (ClientMunicipality.id) {
            const { id: idMunicipality, name, MunicipalityDepartment: departmentData, ...otherDataMunicipality } = ClientMunicipality
            municipality = {
              name,
              id: sharedHelpers.encryptIdDataBase(idMunicipality),
            }
            if (departmentData.id) {

              department = {
                name: departmentData.name,
                id: sharedHelpers.encryptIdDataBase(departmentData.id),
              }
            }
          }

          return {
            id: sharedHelpers.encryptIdDataBase(id),
            numberDocument, 
            name, 
            lastName,
            documentType: {
              ...UserDocumentType,
              id: sharedHelpers.encryptIdDataBase(UserDocumentType.id),
            },
            indicativeNumber: {
              ...UserIndicativePhone,
              id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id),
            },
            numberPhone,
            email: email ?? undefined,
            address: address ?? undefined,
            numberPhoneWhatsapp: numberPhoneWhatsapp ?? undefined,
            indicativeNumberWhatsApp: {
              ...ClientIndicativeNumberWhatsApp,
              id: ClientIndicativeNumberWhatsApp.id ? sharedHelpers.encryptIdDataBase(ClientIndicativeNumberWhatsApp.id) : null,
            },
            municipality,
            department
          }
        }
      )

      return responseHelpers.responseSuccess(res, users)
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
