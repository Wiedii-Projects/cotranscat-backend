// Constants
const { errorsConst, roleConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - Middleware
const { authValidators, userValidators, sharedValidators } = require('../index.validators.middleware');

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

const checkJwt = () => {
    return [
        check('x-token')
            .bail().isString().withMessage(new ErrorModel(errorsConst.userErrors.noToken))
            .bail().custom((value, { req }) => authValidators.validateJWT(value, req)),
        sharedValidators.validateError,
        check('isValidToken')
            .bail().custom((value) => value ? true : false).withMessage(new ErrorModel(errorsConst.authErrors.tokenInvalid)),
        sharedValidators.validateError,
        check('user')
            .bail().custom((value) => value.state ? true : false).withMessage( new ErrorModel(errorsConst.userErrors.userNotExist)),
        sharedValidators.validateError
    ];
}

module.exports = {
    checkJwt,
    checkId: () => {
        return [
            check('id', new ErrorModel(errorsConst.userErrors.idRequired))
                .custom((value, { req }) => req.body.decryptId = sharedHelpers.decryptIdDataBase(value)).bail()
                .custom((_, { req }) => !!req.body.decryptId).bail(),
            sharedValidators.validateError
        ];
    },
    checkAdminRole: () => {
        return [
            ...checkJwt(),
            check('user')
                .bail().custom((value) => value.role.role === roleConst.ADMIN_ROLE).withMessage(new ErrorModel(errorsConst.userErrors.adminRole)),
            sharedValidators.validateError
        ]
    },
    checkCreateUser: () => {
        return [
            check('documentType')
                .isString().withMessage(new ErrorModel(errorsConst.userErrors.idDocumentTypeRequired)).bail()
                .custom((value, {req}) => userValidators.decryptId(value, "idDocumentType", req))
                .custom((_, { req }) => req.body.idDocumentType ? true : false).withMessage(new ErrorModel(errorsConst.userErrors.idDocumentTypeRequired)).bail()
                .custom(async(_, {req}) => await userValidators.validateIdDocumentType({ where: { id: req.body.idDocumentType }}, req))
                .custom((_, { req }) => req.body.isValid ? true : false).withMessage(new ErrorModel(errorsConst.userErrors.idDocumentTypeInvalid)).bail(),
            sharedValidators.validateError,
            check('numberDocument')
                .isString().withMessage(new ErrorModel(errorsConst.userErrors.numberDocumentRequired)).bail()
                .isLength({min: 1, max: 20}).withMessage(new ErrorModel(errorsConst.userErrors.numberDocumentCharacter)).bail(),
            sharedValidators.validateError,
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.userErrors.nameRequired)).bail()
                .isLength({min: 1, max: 50}).withMessage(new ErrorModel(errorsConst.userErrors.nameCharacter)).bail(),
            sharedValidators.validateError,
            check('lastName')
                .isString().withMessage(new ErrorModel(errorsConst.userErrors.lastNameRequired)).bail()
                .isLength({min: 1, max: 50}).withMessage(new ErrorModel(errorsConst.userErrors.lastNameCharacter)).bail(),
            sharedValidators.validateError,
            check('indicativePhone')
                .isString().withMessage(new ErrorModel(errorsConst.userErrors.idIndicativePhoneRequired)).bail()
                .custom((value, {req}) => userValidators.decryptId(value, "idIndicativePhone", req))
                .custom((_, { req }) => req.body.idIndicativePhone ? true : false).withMessage(new ErrorModel(errorsConst.userErrors.idIndicativePhoneRequired)).bail()
                .custom(async(_, {req}) => await userValidators.validateIdIndicativeNumber({ where: { id: req.body.idIndicativePhone }}, req))
                .custom((_, { req }) => req.body.isValid  ? true: false).withMessage(new ErrorModel(errorsConst.userErrors.idIndicativePhoneInvalid)).bail(),
            sharedValidators.validateError,
            check('numberPhone')
                .isString().withMessage(new ErrorModel(errorsConst.userErrors.phoneNumberRequired)).bail()
                .isLength({min: 1, max: 12}).withMessage(new ErrorModel(errorsConst.userErrors.phoneNumberCharacter)).bail(),
            sharedValidators.validateError,
        ];
    }
    //TODO: create validation of the coordinator role
    //TODO: create validation of the seller role
}