// Constants
const { errorsConst } = require('../../constants/index.constants');

// Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

//Validators
const { sharedValidators, travelValidator, seatValidators } = require('../index.validators.middleware');

module.exports = {
    checkGetAllSeat: () => ([
        check('travel')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idTravelInvalid)).bail()
            .custom((value, {req}) => travelValidator.validateTravelId(sharedHelpers.decryptIdDataBase(value), req))
            .custom((_, {req}) => !!req.body.travelExist).withMessage(new ErrorModel(errorsConst.travelErrors.travelDoesNotExist)),
        sharedValidators.validateError,
    ]),
    checkChangeStateToStandBy: () => ([
        check('seat')
        .isString().withMessage(new ErrorModel(errorsConst.seatErrors.idSeatInvalid)).bail()
        .custom((value, {req}) => seatValidators.validateSeat(sharedHelpers.decryptIdDataBase(value), req))
        .custom((_, {req}) => !!req.body.seatExist).withMessage(new ErrorModel(errorsConst.seatErrors.seatDoesNotExist)),
    sharedValidators.validateError,
    ])  
}