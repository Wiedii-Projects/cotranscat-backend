// Constants
const { errorsConst } = require('../../constants/index.constants');

// Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

//Validators
const { sharedValidators, municipalityValidators, sellerValidators } = require('../index.validators.middleware');
const sharedCheckMiddleware = require('./shared.check.middleware');

module.exports = {
    checkCreateRoute: () => {
        return [
            check('idMunicipalityDepart')
                .isString().withMessage( new ErrorModel(errorsConst.routeErrors.municipalityDepartRequired)).bail()
                .custom((value,{req})=> value !== req.body.idMunicipalityArrive).withMessage( new ErrorModel(errorsConst.routeErrors.sameMunicipalityOfArrival)).bail()
                .custom(async (value, { req }) => await municipalityValidators.validateMunicipality(req, { where: { id: sharedHelpers.decryptIdDataBase(value) } })),
            sharedValidators.validateError,

            check('idMunicipality',  new ErrorModel(errorsConst.routeErrors.municipalityDepartDoesNotExist)).custom((value)=> !!value),
            sharedValidators.validateError,

            check('idMunicipalityArrive')
                .isString().withMessage(new ErrorModel(errorsConst.routeErrors.municipalityArriveRequired)).bail()
                .custom(async (value, { req }) => await municipalityValidators.validateMunicipality(req, { where: { id: sharedHelpers.decryptIdDataBase(value) } })),
            sharedValidators.validateError,

            check('idMunicipality',  new ErrorModel(errorsConst.routeErrors.municipalityArriveDoesNotExist)).custom((value)=> !!value),
            sharedValidators.validateError,
        ]
    },
    checkGetAllRouteAccordingHeadquarter: () => {
        return [
            ...sharedCheckMiddleware.checkJwt(),
            check('user')
                .custom((value, { req }) => sellerValidators.validateSellerAndBankAssociated(req, { where: { id: sharedHelpers.decryptIdDataBase(value.id) } }))
                .custom((_, { req }) => !!req.body.bankAssociatedBySeller)
                .withMessage(new ErrorModel(errorsConst.sellerErrors.userHasNoAssociatedHeadquarter))
                .bail(),
            sharedValidators.validateError,
            
        ]
    }
}