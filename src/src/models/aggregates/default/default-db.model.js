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
    defaultOwner,
    defaultBank,
    defaultHeadquarter,
    defaultCountry,
    defaultBloodType,
    defaultLicenseCategory,
    defaultVehicle,
    defaultTrackingStatus,
    defaultTypeBodywork,
    defaultTypeFuel,
    defaultTypeVehicle,
    defaultStateVehicle,
    defaultTemplateVehicle,
    defaultSeatRuler,
    defaultDriverVehicle,
    defaultTravel,
    defaultSeat
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
const StateVehicle = require('../../state-vehicle/stateVehicle.model');
const Owner = require('../../owner/owner.model');
const TemplateVehicle = require('../../template-vehicle/templateVehicle.model');
const SeatRuler = require('../../seat-ruler/seat-ruler.model');
const DriverVehicle = require('../../driver-vehicle/driver-vehicle.model');
const Travel = require('../../travel/travel.model');
const Seat = require('../../seat/seat.model');

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

    async getOwnerRole() {
        const { OWNER_ROLE: type } = roleConst;
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

    async getMunicipality() {
        const { name: from } = defaultMunicipality[10];
        const { name: to } = defaultMunicipality[36];
        const [{ id: arrive }, { id: belong }] = await Promise.all([
            Municipality.findOne({ where: { name: from } }),
            Municipality.findOne({ where: { name: to } })
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

    async countStateVehicle() {
        return await StateVehicle.count();
    }

    async countTemplateVehicle() {
        return await TemplateVehicle.count();
    }

    async countSeatRuler() {
        return await SeatRuler.count();
    }

    async countDriverVehicle() {
        return await DriverVehicle.count();
    }

    async countTravel() {
        return await Travel.count();
    }

    async countSeat() {
        return await Seat.count();
    }

    async createDefaultDataBase() {
        let creationArray = [];
        const [stateVehicle, role, bloodType, licenseCategory, indicativeNumber, documentType, country, department, paymentMethod, municipality,
            typeFuel, typeBodywork, typeVehicle, vehicle, unitMeasure, shippingType, serviceType, headquarter, bank, trackingStatus, templateVehicle, seatRuler,
            driverVehicle, travel, seat
        ] = await Promise.all([
            this.countStateVehicle(),
            this.countRole(),
            this.countBloodType(),
            this.countLicenseCategory(),
            this.countIndicativeNumber(),
            this.countDocumentType(),
            this.countCountry(),
            this.countDepartment(),
            this.countPaymentMethod(),
            this.countMunicipality(),
            this.countTypeFuel(),
            this.countTypeBodywork(),
            this.countTypeVehicle(),
            this.countVehicle(),
            this.countUnitMeasure(),
            this.countShippingType(),
            this.countServiceType(),
            this.countHeadquarter(),
            this.countBank(),
            this.countTrackingStatus(),
            this.countTemplateVehicle(),
            this.countSeatRuler(),
            this.countDriverVehicle(),
            this.countTravel(),
            this.countSeat()
        ]);
        if (!templateVehicle) creationArray.push(TemplateVehicle.bulkCreate(defaultTemplateVehicle))
        if (!stateVehicle) creationArray.push(StateVehicle.bulkCreate(defaultStateVehicle));
        if (!role) Object.values(roleConst).map((element) => creationArray.push(Role.create({ type: element })));
        if (!bloodType) BloodType.bulkCreate(defaultBloodType);
        if (!licenseCategory) LicenseCategory.bulkCreate(defaultLicenseCategory);
        if (!indicativeNumber) creationArray.push(IndicativeNumber.bulkCreate(defaultIndicativeNumber));
        if (!documentType) creationArray.push(DocumentType.bulkCreate(defaultDocumentType));
        if (!country) creationArray.push(Country.bulkCreate(defaultCountry));
        if (!department) creationArray.push(Department.bulkCreate(defaultDepartment));
        if (!paymentMethod) creationArray.push(PaymentMethod.bulkCreate(defaultPaymentMethod));
        if (!typeFuel) creationArray.push(TypeFuel.bulkCreate(defaultTypeFuel));
        if (!typeBodywork) creationArray.push(TypeBodywork.bulkCreate(defaultTypeBodywork));
        if (!typeVehicle) creationArray.push(TypeVehicle.bulkCreate(defaultTypeVehicle));
        if (!unitMeasure) creationArray.push(UnitMeasure.bulkCreate(defaultUnitMeasure));
        if (!shippingType) creationArray.push(ShippingType.bulkCreate(defaultShippingType));
        if (!serviceType) creationArray.push(ServiceType.bulkCreate(defaultServiceType));
        if (!trackingStatus) creationArray.push(TrackingStatus.bulkCreate(defaultTrackingStatus));

        await Promise.all(creationArray);

        creationArray = [];

        if (!municipality) await Municipality.bulkCreate(defaultMunicipality);
        if (!headquarter) creationArray.push(Headquarter.bulkCreate(defaultHeadquarter));
        if (!bank) creationArray.push(Bank.bulkCreate(defaultBank));
        if (!seatRuler) creationArray.push(SeatRuler.bulkCreate(defaultSeatRuler));

        await Promise.all(creationArray);

        const [idMunicipality, idMunicipalityArrive] = await this.getMunicipality();
        await this.countRoute() || await Route.create({ idMunicipalityDepart: idMunicipality, idMunicipalityArrive });

        if (await this.countPaymentMethodBank() === 0) {
            const paymentMethodBanks = defaultPaymentMethod.map(paymentMethod => {
                if (paymentMethod.name === defaultPaymentMethod[0].name || paymentMethod.name === defaultPaymentMethod[1].name) {
                    return [
                        { codePaymentMethod: "02", idPaymentMethod: paymentMethod.id, idBank: 1 },
                        { codePaymentMethod: "00", idPaymentMethod: paymentMethod.id, idBank: 2 }
                    ];
                } else {
                    return [
                        { codePaymentMethod: "01", idPaymentMethod: paymentMethod.id, idBank: 1 },
                        { codePaymentMethod: "01", idPaymentMethod: paymentMethod.id, idBank: 2 }
                    ];
                }
            });

            const flattenedPaymentMethodBanks = paymentMethodBanks.flat();

            await PaymentMethodBank.bulkCreate(flattenedPaymentMethodBanks);
        }

        const userCreate = await this.countUser();

        if (!userCreate) {
            const [admin, seller, client, driver, owner] = defaultUser;
            const [idIndicativePhone, idAdminRole, idSellerRole, idClientRole, idDriverRole, idOwnerRole, idDocumentType, idBank, idBloodType, idLicenseCategory] =
                await Promise.all([
                    this.getIndicativeNumber(),
                    this.getAdminRole(),
                    this.getSellerRole(),
                    this.getClientRole(),
                    this.getDriverRole(),
                    this.getOwnerRole(),
                    this.getDocumentType(),
                    this.getFirstBank(),
                    this.getBloodType(),
                    this.getLicenseCategory()
                ]);
            const [userAdmin, userSeller, userClient, userDriver, userOwner] = await Promise.all([
                User.create({ ...admin, idRole: idAdminRole, idDocumentType, idIndicativePhone }),
                User.create({ ...seller, idRole: idSellerRole, idDocumentType, idIndicativePhone }),
                User.create({ ...client, idRole: idClientRole, idDocumentType, idIndicativePhone }),
                User.create({ ...driver, idRole: idDriverRole, idDocumentType, idIndicativePhone }),
                User.create({ ...owner, idRole: idOwnerRole, idDocumentType, idIndicativePhone })
            ]);

            await Promise.all([
                Admin.create({ ...defaultAdmin, id: userAdmin.id }),
                Seller.create({ ...defaultSeller, id: userSeller.id, idBank }),
                Client.create({
                    ...defaultClient,
                    idIndicativePhoneWhatsApp: idIndicativePhone,
                    idMunicipality,
                    id: userClient.id
                }),
                Driver.create({
                    ...defaultDriver,
                    id: userDriver.id,
                    idBloodType,
                    idLicenseCategory,
                    idMunicipalityOfBirth: idMunicipality,
                    idMunicipalityOfResidence: idMunicipality,
                    isDriverDefault: true
                }),
                Owner.create({
                    ...defaultOwner,
                    id: userOwner.id,
                    idIndicativePhoneWhatsApp: idIndicativePhone,
                    idMunicipalityOfResidence: idMunicipality
                })
            ]);
            if (!vehicle) await Vehicle.bulkCreate(defaultVehicle);
            if (!driverVehicle) await DriverVehicle.create({ ...defaultDriverVehicle, idDriver: userDriver.id });
            if (!travel) await Travel.bulkCreate(defaultTravel);
        };
        if(!seat) await Seat.bulkCreate(defaultSeat)
    }
}

module.exports = defaultDataBaseModel;