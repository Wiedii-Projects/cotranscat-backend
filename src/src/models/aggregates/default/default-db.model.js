//Models - Default Data
const { defaultRole, defaultIndicativeNumber, defaultAdmin, defaultDocumentType, defaultDepartment, defaultPaymentMethod, defaultMunicipality, defaultUnitMeasure, defaultShippingType } = require('./default-data.model');

//Models
const Role = require('../../role/role.model');
const User = require('../../user/user.model');
const IndicativeNumber = require('../../indicative-number/indicative-number.model');
const DocumentType = require('../../document-type/document-type.model');
const Department = require('../../department/department.model');
const PaymentMethod = require('../../payment-method/payment-method.model');
const Municipality = require('../../municipality/municipality.model');
const UnitMeasure = require('../../unit-measure/unit-measure.model');
const ShippingType = require('../../shipping-type/shipping-type.model');

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

    async getMunicipality () {
        const [{ name }] = defaultMunicipality;
        const { id } = await Municipality.findOne({ where: { name }});
        return id;
    }

    async getPaymentMethod () {
        const [{ name }] = defaultDepartment;
        const { id } = await Department.findOne({ where: { name }});
        return id;
    }

    async getUnitMeasure () {
        const [{ name }] = defaultUnitMeasure;
        const { id } = await UnitMeasure.findOne({ where: { name }});
        return id;
    }

    async getShippingType () {
        const [{ name }] = defaultShippingType;
        const { id } = await ShippingType.findOne({ where: { name }});
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

    async countMunicipality() {
        return await Municipality.count();
    }

    async countPaymentMethod() {
        return await PaymentMethod.count();
    }

    async countUnitMeasure() {
        return await UnitMeasure.count();
    }

    async countShippingType() {
        return await ShippingType.count();
    }

    async createDefaultDataBase() {
        await this.countRole() || defaultRole.map( async(element) => await Role.create( element ) );
        await this.countIndicativeNumber() || defaultIndicativeNumber.map(  async(element) => await IndicativeNumber.create( element ) );
        await this.countDocumentType() || defaultDocumentType.map(  async(element) => await DocumentType.create( element ) );
        await this.countDepartment() || defaultDepartment.map(  async(element) => await Department.create( element ) );
        await this.countPaymentMethod() || defaultPaymentMethod.map(  async(element) => await PaymentMethod.create( element ) );
        await this.countMunicipality() || defaultMunicipality.map(  async(element) => await Municipality.create( element ) );
        await this.countUnitMeasure() || defaultUnitMeasure.map(  async(element) => await UnitMeasure.create( element ) );
        await this.countShippingType() || defaultShippingType.map(  async(element) => await ShippingType.create( element ) );

        const indicativeNumber = await this.getIndicativeNumber();
        const idRole = await this.getAdminRole();
        const idDocumentType = await this.getDocumentType();
        const password = await encryptPasswordHelper(process.env.PASSWORD_ADMIN_ROOT);
        const idDepartment = await this.getDepartment();
        const idPaymentMethod = await this.getPaymentMethod();
        const idMunicipality = await this.getMunicipality();
        const idUnitMeasure = await this.getUnitMeasure();
        const idShippingType = await this.getShippingType();

        await this.countUser() || 
            await User.create( 
                { 
                    ...defaultAdmin, 
                    password,
                    idRole, 
                    idDocumentType, 
                    idIndicativeNumberPhone: indicativeNumber, 
                    idIndicativeNumberPhoneWhatsApp: indicativeNumber,
                    idDepartment,
                    idPaymentMethod,
                    idMunicipality,
                    idUnitMeasure,
                    idShippingType
                });
    }
}

module.exports = defaultDataBaseModel;