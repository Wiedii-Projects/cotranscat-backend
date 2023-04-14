const Role = require('../../role/role.model');
const User = require('../../user/user.model');
const CallSign = require('../../indicative-number/indicative-number.model');
const DocumentType = require('../../document-type/document-type.model');
const { defaultRole, defaultCallSign, defaultAdmin, defaultDocumentType } = require('./default-data.model');
const { encryptPasswordHelper } = require('../../../helpers/auth.helpers');

class defaultDataBaseModel {
    constructor() {
        this.createDefaultDataBase();
    }

    async getAdminRole(){
        const [{ role }] = defaultRole;
        const { id } = await Role.findOne({ where: { role }});
        return id;
    }

    async getDocumentType() {
        const [{ name }] = defaultDocumentType;
        const { id } = await DocumentType.findOne({ where: { name }});
        return id;
    }

    async getCallSign () {
        const [{ country }] = defaultCallSign;
        const { id } = await CallSign.findOne({ where: { country }});
        return id;
    }

    async countUser() {
        return await User.count();
    }

    async countDocumentType() {
        return await DocumentType.count();
    }

    async countRole() {
        return await Role.count();
    }

    async countCallSign() {
        return await CallSign.count();
    }

    async createDefaultDataBase() {
        await this.countRole() || defaultRole.map( async(element) => await Role.create( element ) );
        await this.countCallSign() || defaultCallSign.map(  async(element) => await CallSign.create( element ) );
        await this.countDocumentType() || defaultDocumentType.map(  async(element) => await DocumentType.create( element ) );

        const callSign = await this.getCallSign();
        const idRole = await this.getAdminRole();
        const idDocumentType = await this.getDocumentType();
        const password = await encryptPasswordHelper(process.env.PASSWORD_ADMIN_ROOT);
        await this.countUser() || 
            await User.create( 
                { 
                    ...defaultAdmin, 
                    password,
                    idRole, 
                    idDocumentType, 
                    idIndicativeNumberPhone: callSign, 
                    idIndicativeNumberPhoneWhatsApp: callSign
                });
    }
}

module.exports = defaultDataBaseModel;