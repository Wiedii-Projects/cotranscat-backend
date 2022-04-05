const validateFields = require("./validateFields.middlewares");
const validateJWT = require('./validateJwt.middlewares');
const isRole = require('./validateRoles.middlewares');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...isRole
}