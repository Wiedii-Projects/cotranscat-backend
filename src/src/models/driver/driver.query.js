// Constants
const { errorsConst } = require("../../constants/index.constants");

//Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

// Models
const {
  Driver,
  User,
  DocumentType,
  IndicativeNumber,
  Municipality,
  Department,
  Country,
  BloodType,
  LicenseCategory,
  DriverVehicle,
  Vehicle
} = require("../index.models");

module.exports = {
  createDriver: async (where, transaction) => {
    try {
      return await Driver.findOrCreate({ where, transaction });
    } catch {
      throw errorsConst.driverErrors.queryErrors.create;
    }
  },
  findOneDriverQuery: async (query) => {
    const { where } = query;
    return await Driver.findOne({ where, raw: true, nest: true })
  },
  findDriverQuery: async (query) => {
    const {
      where,
      attributes = [
        "id",
        "nickName",
        "email",
        "password",
        "dateOfBirth",
        "address",
        "licenseNumber",
        "dateOfLicenseIssuance",
        "dateExpirationLicense",
        "transitAgency",
        "restriction",
        "licensePhoto",
        "idMunicipalityOfBirth",
        "idMunicipalityOfResidence",
        "idBloodType",
        "idLicenseCategory",
        "state"
      ],
      offset = 0,
      limit = 20,
      include = [
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
        {
          model: DriverVehicle,
          as: "DriverDriverVehicle",
          attributes: [],
          include: [
            {
              model: Vehicle,
              as: "VehicleDriverVehicle"
            }
          ]
        },
        {
          model: Municipality,
          as: "DriverMunicipalityResidence",
          attributes: [
            "name",
            "id"
          ],
          include: [
            {
              model: Department,
              as: "MunicipalityDepartment",
              attributes: [
                "name"
              ],
              include: [
                {
                  model: Country,
                  as: "DepartmentCountry",
                  attributes: [
                    "name"
                  ],
                }
              ]
            }
          ]
        },
        {
          model: Municipality,
          as: "DriverMunicipalityBirth",
          attributes: [
            "name",
            "id"
          ],
          include: [
            {
              model: Department,
              as: "MunicipalityDepartment",
              attributes: [
                "name"
              ],
              include: [
                {
                  model: Country,
                  as: "DepartmentCountry",
                  attributes: [
                    "name"
                  ],
                }
              ]
            }
          ]
        },
        {
          model: BloodType,
          as: "BloodTypeDriver",
          attributes: [
            "id",
            "name"
          ]
        },
        {
          model: LicenseCategory,
          as: "LicenseCategoryDriver",
          attributes: [
            "id",
            "name"
          ]
        }
      ],
      order = [['nickName', 'ASC']]
    } = query;
    try {
      return await Driver.findAll({
        where,
        attributes,
        raw: true,
        nest: true,
        include,
        offset,
        order,
        limit
      }).then((drivers) =>
        drivers.map(
          ({
            UserDriver: {
              UserDocumentType,
              UserIndicativePhone,
              state,
              ...user
            },
            id,
            DriverMunicipalityResidence: municipalityResidence,
            DriverMunicipalityBirth: municipalityBirth,
            BloodTypeDriver,
            LicenseCategoryDriver,
            DriverDriverVehicle,
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
              bloodType: {
                ...BloodTypeDriver,
                id: sharedHelpers.encryptIdDataBase(BloodTypeDriver.id)
              },
              licenseCategory: {
                ...LicenseCategoryDriver,
                id: sharedHelpers.encryptIdDataBase(LicenseCategoryDriver.id)
              },
              countryBirth: {
                ...municipalityBirth.MunicipalityDepartment.DepartmentCountry,
                id: sharedHelpers.encryptIdDataBase(municipalityBirth.MunicipalityDepartment.DepartmentCountry.id)
              },
              departmentBirth: {
                name: municipalityBirth.MunicipalityDepartment.name,
                id: sharedHelpers.encryptIdDataBase(municipalityBirth.MunicipalityDepartment.id)
              },
              municipalityBirth: {
                name: municipalityBirth.name,
                id: sharedHelpers.encryptIdDataBase(municipalityBirth.id)
              },
              countryResidence: {
                ...municipalityResidence.MunicipalityDepartment.DepartmentCountry,
                id: sharedHelpers.encryptIdDataBase(municipalityResidence.MunicipalityDepartment.DepartmentCountry.id)
              },
              departmentResidence: {
                name: municipalityResidence.MunicipalityDepartment.name,
                id: sharedHelpers.encryptIdDataBase(municipalityResidence.MunicipalityDepartment.id)
              },
              municipalityResidence: {
                name: municipalityResidence.name,
                id: sharedHelpers.encryptIdDataBase(municipalityResidence.id)
              },
              vehicle: {
                ...DriverDriverVehicle.VehicleDriverVehicle,
                id: DriverDriverVehicle.VehicleDriverVehicle.id ?
                  sharedHelpers.encryptIdDataBase(DriverDriverVehicle.VehicleDriverVehicle):
                  null
              },
            };
          }
        )
      );
    } catch {
      throw errorsConst.driverErrors.queryErrors.findError;
    }
  },
  updateDriver: async (values, where, transaction) => {
    try {
      await Driver.update(values, { where, transaction });
    } catch {
      throw errorsConst.driverErrors.queryErrors.updateError;
    }
  }
};
