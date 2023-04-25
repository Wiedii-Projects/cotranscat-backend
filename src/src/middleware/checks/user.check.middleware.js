// Constants
const { errorsConst, roleConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - Middleware
const { userValidators } = require('../index.validators.middleware');

module.exports = {
    checkAllGetUser: () => {
        return [
        ];
    },
    checkGetUser: () => {
        return [
        ];
    },
    checkCreateUser: () => {
        return [
        ];
    },
    checkCreateClientUser: () => {
        return [
        ];
    },
    checkCreateAdminUser: () => {
        return [
        ];
    },
    checkUpdateUser: () => {
        return [
        ];
    },
    checkDeleteUser: () => {
        return [
        ]
    }
};