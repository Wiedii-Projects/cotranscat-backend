// Constants
const {
  errorsConst
} = require("../../../constants/index.constants");

// Libraries
const { check } = require("express-validator");

// Models
const { ErrorModel } = require("../../../models/index.models");

// Validators - Middleware
const { sharedValidators } = require("../../index.validators.middleware");

module.exports = {
  checkDeleteUser: () => {
    return [];
  },
  checkFilterUsers: () => {
    return [
      check('name')
        .optional({checkFalsy: false})
        .isString()
        .withMessage(new ErrorModel(errorsConst.userErrors.nameRequired))
        .bail()
        .isLength({ min: 1 })
        .withMessage(new ErrorModel(errorsConst.userErrors.nameIsEmpty)),
        sharedValidators.validateError,
      check('lastName')
        .optional({checkFalsy: false})
        .isString()
        .withMessage(new ErrorModel(errorsConst.userErrors.lastNameRequired))
        .bail()
        .isLength({ min: 1 })
        .withMessage(new ErrorModel(errorsConst.userErrors.lastNameIsEmpty)),
        sharedValidators.validateError,
      check('numberDocument')
        .optional({checkFalsy: false})
        .isString()
        .withMessage(new ErrorModel(errorsConst.userErrors.numberDocumentRequired))
        .bail()
        .isLength({ min: 1 })
        .withMessage(new ErrorModel(errorsConst.userErrors.numberDocumentIsEmpty)),
        sharedValidators.validateError,
    ]
  },
};
