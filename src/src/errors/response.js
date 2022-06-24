const { MessageErrors } = require('../models');

const responseError = (res, status, error) => {
    return res.status(status).json({
        status: false,
        data: null,
        errors: new MessageErrors(error)
    });
}

const responseAllError = (res, status, error) => {
    return res.status(status).json({
        status: false,
        data: null,
        errors: error
    });
}

const responseValid = (res, data) => {
    return res.json({
        status: true,
        data: data,
        errors: null
    });
}

module.exports = {
    responseError,
    responseAllError,
    responseValid
}