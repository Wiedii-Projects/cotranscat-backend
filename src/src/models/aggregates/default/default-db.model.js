const Role = require('../../role/role.model');

class defaultDataBaseModel {
    constructor() {
        this.defaultRole = [ { role: "ADMIN_ROLE"}, { role: "USER_ROLE" } ];

        this.createDefaultDataBase();
    }

    async roles() {
        return await Role.count();
    }

    async createDefaultDataBase() {
        await this.roles() || this.defaultRole.map( async(element) => await Role.create( element ) );
    }
}

module.exports = defaultDataBaseModel;