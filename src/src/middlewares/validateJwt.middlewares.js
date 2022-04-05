const jwt = require('jsonwebtoken');
const { privateKey } = require('../config');
const { User } = require('../models');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            status: false,
            data: null,
            errors: 'No token in request'
        })
    };
    try {
        const { uid } = jwt.verify(token, privateKey);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                status: false,
                data: null,
                errors: 'User does not exist'
            })
        };

        if (!user.state) {
            return res.status(401).json({
                status: false,
                data: null,
                errors: 'Invalid token'
            })
        };

        req.user = user;
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: false,
            data: null,
            errors: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
}