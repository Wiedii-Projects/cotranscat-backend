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
      check('filterValue')
        .isString()
        .withMessage(new ErrorModel(errorsConst.userErrors.valueToFilterIsRequired))
        .bail()
        .isLength({ min: 1 })
        .withMessage(new ErrorModel(errorsConst.userErrors.filterValueIsEmpty)),
        sharedValidators.validateError
    ]
  },
};
