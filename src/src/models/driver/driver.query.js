// Constants
const { errorsConst } = require("../../constants/index.constants");

//Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

// Models
const {
  Driver,
  User,
  DocumentType,
  IndicativeNumber
} = require("../index.models");

module.exports = {
  createDriver: async (where, transaction) => {
    try {
      return await Driver.findOrCreate({ where, transaction });
    } catch {
      throw errorsConst.driverErrors.queryErrors.create;
    }
  },
  findDriverQuery: async (where) => {
    try {
      return await Driver.findAll({
        where,
        attributes: ["id", "nickName", "email"],
        raw: true,
        nest: true,
        include: [
          {
            model: User,
            as: "UserDriver",
            attributes: [
              "numberDocument",
              "name",
              "lastName",
              "numberPhone",
              "state",
            ],
            include: [
              {
                model: DocumentType,
                as: "UserDocumentType",
              },
              {
                model: IndicativeNumber,
                as: "UserIndicativePhone",
              },
              {
                model: IndicativeNumber,
                as: "UserIndicativePhone",
              },
            ],
          },
        ],
      }).then((drivers) =>
      drivers.map(
        ({
          UserDriver: { UserDocumentType, UserIndicativePhone, ...user },
          id,
          ...driver
        }) => {
          return {
            id: sharedHelpers.encryptIdDataBase(id),
            ...driver,
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
    );
    } catch (e){
        console.log(e)
      throw errorsConst.driverErrors.queryErrors.findError;
    }
  },
  updateDriver: async (values, where, transaction) => {
    try {
      await Driver.update(values, { where, transaction });
    } catch {
      throw errorsConst.driverErrors.queryErrors.updateError;
    }
  },
};
