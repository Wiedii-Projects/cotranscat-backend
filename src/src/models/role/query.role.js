const { Role } = require("../../models");

const isValidRole = async (role = '') => {
    return await Role.findOne({ role });
};

module.exports = {
    isValidRole
}