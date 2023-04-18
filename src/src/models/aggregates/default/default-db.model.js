//Models - Default Data
const { defaultRole, defaultIndicativeNumber, defaultAdmin, defaultDocumentType, defaultDepartment } = require('./default-data.model');

//Models
const Role = require('../../role/role.model');
const User = require('../../user/user.model');
const IndicativeNumber = require('../../indicative-number/indicative-number.model');
const DocumentType = require('../../document-type/document-type.model');
const Department = require('../../department/department.model');

//Helpers
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

    async getIndicativeNumber () {
        const [{ country }] = defaultIndicativeNumber;
        const { id } = await IndicativeNumber.findOne({ where: { country }});
        return id;
    }

    async getDepartment () {
        const [{ name }] = defaultDepartment;
        const { id } = await Department.findOne({ where: { name }});
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

    async countIndicativeNumber() {
        return await IndicativeNumber.count();
    }

    async countDepartment() {
        return await Department.count();
    }

    async createDefaultDataBase() {
        await this.countRole() || defaultRole.map( async(element) => await Role.create( element ) );
        await this.countIndicativeNumber() || defaultIndicativeNumber.map(  async(element) => await IndicativeNumber.create( element ) );
        await this.countDocumentType() || defaultDocumentType.map(  async(element) => await DocumentType.create( element ) );
        await this.countDepartment() || defaultDepartment.map(  async(element) => await Department.create( element ) );


        const indicativeNumber = await this.getIndicativeNumber();
        const idRole = await this.getAdminRole();
        const idDocumentType = await this.getDocumentType();
        const password = await encryptPasswordHelper(process.env.PASSWORD_ADMIN_ROOT);
        const idDepartment = await this.getDepartment();

        await this.countUser() || 
            await User.create( 
                { 
                    ...defaultAdmin, 
                    password,
                    idRole, 
                    idDocumentType, 
                    idIndicativeNumberPhone: indicativeNumber, 
                    idIndicativeNumberPhoneWhatsApp: indicativeNumber,
                    idDepartment
                });
    }
}

module.exports = defaultDataBaseModel;