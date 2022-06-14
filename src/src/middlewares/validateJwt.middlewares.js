const jwt = require('jsonwebtoken');
const { privateKey } = require('../config');
const { User } = require('../models');
const errors = require('../errors/errors.json');
const { responseError } = require('../errors/response');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return responseError(res, 400, errors.user.noToken);
    };
    try {
        const { uid } = jwt.verify(token, privateKey);
        const user = await User.findById(uid);

        if (!user) {
        return responseError(res, 400, errors.user.userNotExist);
        };

        if (!user.state) {
        return responseError(res, 400, errors.user.invalidToken);
        };

        req.user = user;
        next()

    } catch (error) {
        return responseError(res, 500, errors.user.invalidToken);
    }
}

module.exports = {
    validateJWT
}