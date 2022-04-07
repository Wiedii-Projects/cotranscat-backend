const jwt = require('jsonwebtoken');
const { privateKey } = require('../config');
const { User } = require('../models');
const { MessageErrors } = require('../models');
const errors = require('../errors/errors.json');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.user.noToken)
        })
    };
    try {
        const { uid } = jwt.verify(token, privateKey);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.user.userNotExist)
            })
        };

        if (!user.state) {
            return res.status(401).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.user.invalidToken)
            })
        };

        req.user = user;
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.user.invalidToken)
        });
    }
}

module.exports = {
    validateJWT
}