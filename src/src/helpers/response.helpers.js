// Models
const { ErrorModel } = require('../models/index.models');

module.exports = {
    responseError: (res, status, error) => {
        return res.status(status).json({
            status: false,
            data: null,
            errors: new ErrorModel(error)
        });
    },
    responseAllError: (res, status, error) => {
        return res.status(status).json({
            status: false,
            data: null,
            errors: error
        });
    },
    responseSuccess: (res, data) => {
        return res.json({
            status: true,
            data: data,
            errors: null
        });
    }
}