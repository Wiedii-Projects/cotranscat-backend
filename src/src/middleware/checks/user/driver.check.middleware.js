// Constants
const { errorsConst } = require("../../../constants/index.constants");

// Libraries
const { check } = require("express-validator");

// Check - middleware
const sharedCheckMiddleware = require("../shared.check.middleware");

// Validators - middleware
const {
  sharedValidators,
  driverValidator,
  municipalityValidators,
  bloodTypeValidators,
  licenseCategoryValidators
} = require("../../index.validators.middleware");

// Models
const { ErrorModel } = require("../../../models/index.models");

// Helpers
const sharedHelpers = require("../../../helpers/shared.helpers");

module.exports = {
  checkCreateDriver: () => [
    ...sharedCheckMiddleware.checkCreateUser(),
    check("nickName")
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.nickNameRequired)).bail()
      .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driverErrors.lengthNickName)),
    sharedValidators.validateError,
    check("email")
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.emailRequired)).bail()
      .isEmail().withMessage(new ErrorModel(errorsConst.driverErrors.emailInvalid)),
    sharedValidators.validateError,
    check("password")
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.passwordRequired)).bail()
      .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.driverErrors.lengthPassword)),
    sharedValidators.validateError,
    ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
    check("dateOfBirth").isDate().withMessage(new ErrorModel(errorsConst.driverErrors.dateOfBirthRequired)).bail(),
    check("address").isString().withMessage(new ErrorModel(errorsConst.driverErrors.addressRequired)).bail()
      .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driverErrors.addressSize)).bail(),
    check("licenseNumber").isString().withMessage(new ErrorModel(errorsConst.driverErrors.licenseNumberRequired)).bail()
      .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.driverErrors.licenseNumberSize)).bail(),
    check("dateOfLicenseIssuance").isDate().withMessage(new ErrorModel(errorsConst.driverErrors.dateOfLicenseIssuanceRequired)).bail(),
    check("dateExpirationLicense").isDate().withMessage(new ErrorModel(errorsConst.driverErrors.dateExpirationLicenseRequired)).bail(),
    check("transitAgency").isString().withMessage(new ErrorModel(errorsConst.driverErrors.transitAgencyRequired)).bail()
      .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.driverErrors.transitAgencySize)).bail(),
    check("restriction").isString().withMessage(new ErrorModel(errorsConst.driverErrors.restrictionRequired)).bail()
      .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driverErrors.restrictionSize)).bail(),
    check("municipalityOfBirth").custom((value, { req }) => municipalityValidators.validateIdMunicipality(req, sharedHelpers.decryptIdDataBase(value), "idMunicipalityOfBirth"))
      .custom((value, { req }) => !!req.body.idMunicipalityOfBirth).withMessage(new ErrorModel(errorsConst.driverErrors.idMunicipalityOfBirthRequired)).bail(),
    check("municipalityOfResidence").custom((value, { req }) => municipalityValidators.validateIdMunicipality(req, sharedHelpers.decryptIdDataBase(value), "idMunicipalityOfResidence"))
      .custom((value, { req }) => !!req.body.idMunicipalityOfResidence).withMessage(new ErrorModel(errorsConst.driverErrors.idMunicipalityOfResidenceRequired)).bail(),
    check("bloodType").custom((value, { req }) => bloodTypeValidators.validateIdBloodType(req, sharedHelpers.decryptIdDataBase(value), "idBloodType"))
      .custom((value, { req }) => !!req.body.idBloodType).withMessage(new ErrorModel(errorsConst.driverErrors.idBloodTypeRequired)).bail(),
    check("licenseCategory").custom((value, { req }) => licenseCategoryValidators.validateIdLicenseCategory(req, sharedHelpers.decryptIdDataBase(value), "idLicenseCategory"))
      .custom((value, { req }) => !!req.body.idLicenseCategory).withMessage(new ErrorModel(errorsConst.driverErrors.idLicenseCategory)).bail(),
    sharedValidators.validateError,
  ],
  checkDriverExist: () => [
    ...sharedCheckMiddleware.checkId(),
    check("decryptId", new ErrorModel(errorsConst.driverErrors.driverNotExist)).bail()
      .custom((id, { req }) => driverValidator.validateDriver(req, id)).bail()
      .custom((_, { req }) => !!req.body.driver),
    sharedValidators.validateError,
  ],
  checkUpdateDriver: () => [
    ...sharedCheckMiddleware.checkId(),
    ...sharedCheckMiddleware.checkUpdateUser(),
    check("nickName").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.nickNameRequired)).bail()
      .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driverErrors.lengthNickName)),
    sharedValidators.validateError,
    check("email").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.emailRequired)).bail()
      .isEmail().withMessage(new ErrorModel(errorsConst.driverErrors.emailInvalid)),
    sharedValidators.validateError,
    check("password").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.passwordRequired)).bail()
      .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.driverErrors.lengthPassword)),
    sharedValidators.validateError,
    ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
    check("dateOfBirth").optional({ checkFalsy: false })
      .isDate().withMessage(new ErrorModel(errorsConst.driverErrors.dateOfBirthRequired)).bail(),
    check("address").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.addressRequired)).bail()
      .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driverErrors.addressSize)).bail(),
    check("licenseNumber").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.licenseNumberRequired)).bail()
      .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.driverErrors.licenseNumberSize)).bail(),
    check("dateOfLicenseIssuance").optional({ checkFalsy: false })
      .isDate().withMessage(new ErrorModel(errorsConst.driverErrors.dateOfLicenseIssuanceRequired)).bail(),
    check("dateExpirationLicense").optional({ checkFalsy: false })
      .isDate().withMessage(new ErrorModel(errorsConst.driverErrors.dateExpirationLicenseRequired)).bail(),
    check("transitAgency").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.transitAgencyRequired)).bail()
      .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.driverErrors.transitAgencySize)).bail(),
    check("restriction").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.restrictionRequired)).bail()
      .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driverErrors.restrictionSize)).bail(),
    check("municipalityOfBirth").optional({ checkFalsy: false })
      .custom((value, { req }) => municipalityValidators.validateIdMunicipality(req, sharedHelpers.decryptIdDataBase(value), "idMunicipalityOfBirth"))
      .custom((value, { req }) => !!req.body.idMunicipalityOfBirth).withMessage(new ErrorModel(errorsConst.driverErrors.idMunicipalityOfBirthRequired)).bail(),
    check("municipalityOfResidence").optional({ checkFalsy: false })
      .custom((value, { req }) => municipalityValidators.validateIdMunicipality(req, sharedHelpers.decryptIdDataBase(value), "idMunicipalityOfResidence"))
      .custom((value, { req }) => !!req.body.idMunicipalityOfResidence).withMessage(new ErrorModel(errorsConst.driverErrors.idMunicipalityOfResidenceRequired)).bail(),
    check("bloodType").optional({ checkFalsy: false })
      .custom((value, { req }) => bloodTypeValidators.validateIdBloodType(req, sharedHelpers.decryptIdDataBase(value), "idBloodType"))
      .custom((value, { req }) => !!req.body.idBloodType).withMessage(new ErrorModel(errorsConst.driverErrors.idBloodTypeRequired)).bail(),
    check("licenseCategory").optional({ checkFalsy: false })
      .custom((value, { req }) => licenseCategoryValidators.validateIdLicenseCategory(req, sharedHelpers.decryptIdDataBase(value), "idLicenseCategory"))
      .custom((value, { req }) => !!req.body.idLicenseCategory).withMessage(new ErrorModel(errorsConst.driverErrors.idLicenseCategory)).bail(),
    sharedValidators.validateError,
  ]
};
