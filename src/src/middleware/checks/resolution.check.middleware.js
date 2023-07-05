// Constants
const { errorsConst } = require('../../constants/index.constants');

// Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

//Validators
const { 
    sharedValidators, routeValidator, serviceTypeValidators, prefixValidators, resolutionValidators, 
    bankValidators 
} = require('../index.validators.middleware');


module.exports = {
    checkCreateResolution: () => {
        return [
            ...sharedCheckMiddleware.checkJwt(),
            check("idRouteAssociated")
                .isString()
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.idRouteRequired))
                .bail()
                .custom((id, { req }) => req.body.idRoute = sharedHelpers.decryptIdDataBase(id))
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.idRouteInvalid))
                .bail(),
            sharedValidators.validateError,
            check("idServiceTypeAssociated")
                .isString()
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.idServiceTypeRequired))
                .bail()
                .custom((id, { req }) => req.body.idServiceType = sharedHelpers.decryptIdDataBase(id))
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.serviceTypeInvalid))
                .bail(),
            sharedValidators.validateError,
            check("TNSPrefix")
                .custom((value) => {
                    if (typeof value !== 'string')
                        throw new ErrorModel(errorsConst.resolutionErrors.TNSPrefixRequired)
                    return true;
                })
                .isLength({ min: 2, max: 2 })
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.TNSPrefixInvalid))
                .bail(),
            sharedValidators.validateError,
            check("DIANPrefix")
                .custom((value) => {
                    if (typeof value !== 'string')
                        throw new ErrorModel(errorsConst.resolutionErrors.DIANPrefixRequired)
                    return true;
                })
                .isLength({ min: 1 })
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.DIANPrefixRequired))
                .bail(),
            sharedValidators.validateError,
            check("currentConsecutive")
                .isInt( { min: 0})
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.currentConsecutiveRequired))
                .bail(),
            sharedValidators.validateError,
            check("number")
                .isInt( { min: 0})
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.numberRequired))
                .bail()
                .isLength( { min: 15, max: 15})
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.numberInvalid))
                .bail(),
            sharedValidators.validateError,
            check('initialRange')
                .isInt({ min: 0 })
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.initialRangeRequired))
                .bail(),
            sharedValidators.validateError,
            check('finalRange')
                .isInt({ min: 0 })
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.finalRangeRequired))
                .custom((value, { req }) => {
                    if (parseInt(value) <= parseInt(req.body.initialRange))
                        throw new ErrorModel(errorsConst.resolutionErrors.rangesInvalid)
                    return true;
                }),
            sharedValidators.validateError,
            check('date')
                .custom((value) => {
                    if (typeof value !== 'string')
                        throw new ErrorModel(errorsConst.resolutionErrors.dateResolutionRequired)
                    return true;
                })
                .bail()
                .isDate()
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.dateResolutionInvalid))
                .bail(),
            sharedValidators.validateError,
            check('codeBank')
                .custom((value) => {
                    if (typeof value !== 'string')
                        throw new ErrorModel(errorsConst.resolutionErrors.codeBankRequired)
                    return true;
                })
                .bail()
                .isLength({ min: 2, max: 2 })
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.codeBankInvalid))
                .bail(),
            sharedValidators.validateError,
            check('idRoute')
                .custom((id, { req }) => routeValidator.validateRoute(req, { where: { id } }))
                .custom((_, { req }) => !!req.body.route)
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.routeNotExist))
                .bail()
                .custom((id, { req }) => routeValidator.validateHeadquarterByRouteSource(req, { where: { id } }))
                .custom((_, { req }) => !!req.body.headquarter)
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.headquarterNotExist))
                .bail(),
            sharedValidators.validateError,
            check('idServiceType')
                .custom((id, { req }) => serviceTypeValidators.validateServiceType(req, { where: { id } }))
                .custom((_, { req }) => !!req.body.serviceType)
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.serviceTypeNotExist))
                .bail(),
            sharedValidators.validateError,
            check('TNSPrefix')
                .custom((code, { req }) => prefixValidators.validateIsNewTNSPrefix(req, { where: { code } }))
                .custom((_, { req }) => req.body.isNewTNSPrefix)
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.TNSPrefixAlreadyExists))
                .bail(),
            sharedValidators.validateError,
            check('DIANPrefix')
                .custom((DIANPrefix, { req }) => resolutionValidators.validateIsNewDIANPrefix(req, { where: { DIANPrefix } }))
                .custom((_, { req }) => req.body.isNewDIANPrefix)
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.DIANPrefixAlreadyExists))
                .bail(),
            sharedValidators.validateError,
            check('DIANPrefix')
                .custom((DIANPrefix, { req }) => resolutionValidators.validateIsNewDIANPrefix(req, { where: { DIANPrefix } }))
                .custom((_, { req }) => req.body.isNewDIANPrefix)
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.DIANPrefixAlreadyExists))
                .bail(),
            sharedValidators.validateError,
            check('codeBank')
                .custom((code, { req }) => bankValidators.validateBank(req, { where: { code } }))
                .custom((_, { req }) => !!req.body.bank)
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.bankNotExist))
                .bail()
                .custom((code, { req }) => bankValidators.validateBankAssociatedByHeadquarter(req, code))
                .custom((_, { req }) => !!req.body.isValidBankAssociatedByHeadquarter)
                .withMessage(new ErrorModel(errorsConst.resolutionErrors.bankAssociatedByHeadquarterIsInvalid))
                .bail(),
            sharedValidators.validateError
        ]
    },
    checkGetAllResolutionInvoice: () => {
        return [
            ...sharedCheckMiddleware.checkJwt()
        ]
    }
}