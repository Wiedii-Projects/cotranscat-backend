const validateFields = require("./validate/validateFields.middlewares");
const validateJWT = require('./validate/validateJwt.middlewares');
const isRole = require('./validate/validateRoles.middlewares');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...isRole
}