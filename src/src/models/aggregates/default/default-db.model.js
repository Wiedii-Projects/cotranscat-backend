//Models - Default Data
const {
    defaultIndicativeNumber,
    defaultUser,
    defaultDocumentType,
    defaultDepartment,
    defaultPaymentMethod,
    defaultMunicipality,
    defaultUnitMeasure,
    defaultShippingType,
    defaultAdmin,
    defaultServiceType,
    defaultSeller,
    defaultClient,
    defaultDriver,
    defaultBank,
    defaultHeadquarter,
    defaultCountry,
    defaultBloodType,
    defaultLicenseCategory,
    defaultVehicle,
    defaultTrackingStatus,
    defaultTypeBodywork,
    defaultTypeFuel,
    defaultTypeVehicle
} = require('./default-data.model');

//Const
const { roleConst } = require('../../../constants/index.constants')

//Models
const Role = require('../../role/role.model');
const User = require('../../user/user.model');
const Admin = require('../../admin/admin.model');
const Seller = require('../../seller/seller.model');
const Client = require('../../client/client.model');
const IndicativeNumber = require('../../indicative-number/indicative-number.model');
const DocumentType = require('../../document-type/document-type.model');
const Department = require('../../department/department.model');
const PaymentMethod = require('../../payment-method/payment-method.model');
const Municipality = require('../../municipality/municipality.model');
const Country = require('../../country/country.model');
const UnitMeasure = require('../../unit-measure/unit-measure.model');
const ShippingType = require('../../shipping-type/shipping-type.model');
const ServiceType = require('../../service-type/service-type.model');
const Driver = require('../../driver/driver.model');
const Vehicle = require('../../vehicle/vehicle.model');
const Route = require('../../route/route.model');
const Bank = require('../../bank/bank.model');
const Headquarter = require('../../headquarter/headquarter.model');
const BloodType = require('../../bloodType/bloodType.model');
const LicenseCategory = require('../../licenseCategory/licenseCategory.model');
const PaymentMethodBank = require('../../payment-method-bank/payment-method-bank.model');
const TrackingStatus = require('../../tracking-status/tracking-status.model');
const TypeFuel = require("../../type-fuel/typeFuel.model")
const TypeBodywork = require("../../type-bodywork/typeBodywork.model")
const TypeVehicle = require('../../type-vehicle/typeVehicle.model');

class defaultDataBaseModel {
    constructor() {
        this.createDefaultDataBase();
    }

    async getAdminRole() {
        const { ADMIN_ROLE: type } = roleConst;
        const { id } = await Role.findOne({ where: { type } });
        return id;
    }

    async getSellerRole() {
        const { SELLER_ROLE: type } = roleConst;
        const { id } = await Role.findOne({ where: { type } });
        return id;
    }

    async getClientRole() {
        const { CLIENT_ROLE: type } = roleConst;
        const { id } = await Role.findOne({ where: { type } });
        return id;
    }

    async getDriverRole() {
        const { DRIVER_ROLE: type } = roleConst;
        const { id } = await Role.findOne({ where: { type } });
        return id;
    }

    async getDocumentType() {
        const [{ name }] = defaultDocumentType;
        const { id } = await DocumentType.findOne({ where: { name } });
        return id;
    }

    async getIndicativeNumber() {
        const [{ country }] = defaultIndicativeNumber;
        const { id } = await IndicativeNumber.findOne({ where: { country } });
        return id;
    }

    async getBloodType() {
        const [{ name }] = defaultBloodType;
        const { id } = await BloodType.findOne({ where: { name } });
        return id;
    }

    async getLicenseCategory() {
        const [{ name }] = defaultLicenseCategory;
        const { id } = await LicenseCategory.findOne({ where: { name } });
        return id;
    }

    async getMunicipality () {
        const { name: from } = defaultMunicipality[10];
        const { name: to } = defaultMunicipality[36];
        const [ { id: arrive }, { id: belong } ] = await Promise.all([
            Municipality.findOne({ where: { name: from }}),
            Municipality.findOne({ where: { name: to }})
        ]);
        return [arrive, belong];
    }

    async getPaymentMethod() {
        const [{ name }] = defaultPaymentMethod;
        const { id } = await PaymentMethod.findOne({ where: { name } });
        return id;
    }

    async getUnitMeasure() {
        const [{ name }] = defaultUnitMeasure;
        const { id } = await UnitMeasure.findOne({ where: { name } });
        return id;
    }

    async getUserAdmin(where) {
        return await User.findOne({ where, raw: true });
    }

    async getShippingType() {
        const [{ name }] = defaultShippingType;
        const { id } = await ShippingType.findOne({ where: { name } });
        return id;
    }

    async getFirstBank() {
        const [{ code }] = defaultBank;
        const { id } = await Bank.findOne({ where: { code } });
        return id;
    }

    async countUser() {
        return await User.count();
    }

    async countClient() {
        return await Client.count();
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

    async countCountry() {
        return await Country.count();
    }

    async countLicenseCategory() {
        return await LicenseCategory.count();
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

    async countServiceType() {
        return await ServiceType.count();
    }

    async countVehicle() {
        return await Vehicle.count();
    }

    async countRoute() {
        return await Route.count();
    }

    async countBank() {
        return await Bank.count();
    }

    async countHeadquarter() {
        return await Headquarter.count();
    }

    async countBloodType() {
        return await BloodType.count();
    }

    async countPaymentMethodBank() {
        return await PaymentMethodBank.count();
    }

    async countTrackingStatus() {
        return await TrackingStatus.count();
    }

    async countTypeFuel() {
        return await TypeFuel.count();
    }

    async countTypeBodywork() {
        return await TypeBodywork.count();
    }

    async countTypeVehicle() {
        return await TypeVehicle.count();
    }

    async createDefaultDataBase() {
        await this.countRole() || Object.values(roleConst).map(async (element) => { await Role.create({ type: element }) });
        await this.countBloodType() || defaultBloodType.map(async (element) => { await BloodType.create(element) });
        await this.countLicenseCategory() || defaultLicenseCategory.map(async (element) => { await LicenseCategory.create(element) });
        await this.countIndicativeNumber() || defaultIndicativeNumber.map(async (element) => await IndicativeNumber.create(element));
        await this.countDocumentType() || defaultDocumentType.map(async (element) => await DocumentType.create(element));
        await this.countCountry() || defaultCountry.map(async (element) => await Country.create(element));
        await this.countDepartment() || defaultDepartment.map(async (element) => await Department.create(element));
        await this.countPaymentMethod() || defaultPaymentMethod.map(async (element) => await PaymentMethod.create(element));
        await this.countMunicipality() || defaultMunicipality.map(async (element) => await Municipality.create(element));
        await this.countTypeFuel() || defaultTypeFuel.map(async (element) => await TypeFuel.create(element));
        await this.countTypeBodywork() || defaultTypeBodywork.map(async (element) => await TypeBodywork.create(element));
        await this.countTypeVehicle() || defaultTypeVehicle.map(async (element) => await TypeVehicle.create(element));
        await this.countVehicle() || defaultVehicle.map(async (element) => { await Vehicle.create(element) });
        await this.countUnitMeasure() || defaultUnitMeasure.map(async (element) => await UnitMeasure.create(element));
        await this.countShippingType() || defaultShippingType.map(async (element) => await ShippingType.create(element));
        await this.countServiceType() || defaultServiceType.map(async (element) => await ServiceType.create(element));
        const [idMunicipality, idMunicipalityArrive] = await this.getMunicipality();
        await this.countRoute() || await Route.create({ idMunicipalityDepart: idMunicipality, idMunicipalityArrive });

        if (await this.countHeadquarter() === 0) {
            for (const element of defaultHeadquarter) {
                await Headquarter.create(element)
            }
        }

        if (await this.countBank() === 0) {
            for (const bank of defaultBank) {
                await Bank.create(bank);
            }
        }

        if (await this.countPaymentMethodBank() === 0) {
            const paymentMethodBanks = defaultPaymentMethod.map(paymentMethod => {
                if (paymentMethod.name !== "Transferencia") {
                    return [
                        { codePaymentMethod: "01", idPaymentMethod: paymentMethod.id, idBank: 1 },
                        { codePaymentMethod: "01", idPaymentMethod: paymentMethod.id, idBank: 2 }
                    ];
                } else {
                    return [
                        { codePaymentMethod: "02", idPaymentMethod: paymentMethod.id, idBank: 1 },
                        { codePaymentMethod: "00", idPaymentMethod: paymentMethod.id, idBank: 2 }
                    ];
                }
            });

            const flattenedPaymentMethodBanks = paymentMethodBanks.flat();

            await PaymentMethodBank.bulkCreate(flattenedPaymentMethodBanks);
        }
        if (await this.countTrackingStatus() === 0) {
            await TrackingStatus.bulkCreate(defaultTrackingStatus);
        }

        const userCreate = await this.countUser();

        if (!userCreate) {
            const [admin, seller, client, driver] = defaultUser;
            const [
                indicativeNumber,
                idAdminRole,
                idSellerRole,
                idClientRole,
                idDriverRole,
                idDocumentType,
                idPaymentMethod,
                idUnitMeasure,
                idShippingType,
                idBank,
                idBloodType,
                idLicenseCategory
            ] = await Promise.all([
                this.getIndicativeNumber(),
                this.getAdminRole(),
                this.getSellerRole(),
                this.getClientRole(),
                this.getDriverRole(),
                this.getDocumentType(),
                this.getPaymentMethod(),
                this.getUnitMeasure(),
                this.getShippingType(),
                this.getFirstBank(),
                this.getBloodType(),
                this.getLicenseCategory()
            ]);
            const [userAdmin, userSeller, userClient, userDriver] = await Promise.all([
                User.create({
                    ...admin,
                    idRole: idAdminRole,
                    idDocumentType,
                    idIndicativePhone: indicativeNumber,
                    idPaymentMethod,
                    idUnitMeasure,
                    idShippingType
                }),
                User.create({
                    ...seller,
                    idRole: idSellerRole,
                    idDocumentType,
                    idIndicativePhone: indicativeNumber,
                    idPaymentMethod,
                    idUnitMeasure,
                    idShippingType
                }),
                User.create({
                    ...client,
                    idRole: idClientRole,
                    idDocumentType,
                    idIndicativePhone: indicativeNumber,
                    idPaymentMethod,
                    idUnitMeasure,
                    idShippingType
                }),
                User.create({
                    ...driver,
                    idRole: idDriverRole,
                    idDocumentType,
                    idIndicativePhone: indicativeNumber,
                    idPaymentMethod,
                    idUnitMeasure,
                    idShippingType
                })
            ]);

            await Promise.all([
                Admin.create({ ...defaultAdmin, id: userAdmin.id }),
                Seller.create({ ...defaultSeller, id: userSeller.id, idBank }),
                Client.create({
                    ...defaultClient,
                    idIndicativePhoneWhatsApp: indicativeNumber,
                    idMunicipality,
                    id: userClient.id
                }),
                Driver.create({
                    ...defaultDriver,
                    id: userDriver.id,
                    idBloodType,
                    idLicenseCategory,
                    idMunicipalityOfBirth: idMunicipality,
                    idMunicipalityOfResidence: idMunicipality
                }),
            ]);
        };
    }
}

module.exports = defaultDataBaseModel;