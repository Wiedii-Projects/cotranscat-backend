const User = require("./user/user.model");
const Role = require("./role/role.model");
const DocumentType = require("./document-type/document-type.model");
const IndicativeNumber = require("./indicative-number/indicative-number.model");
const Department = require("./department/department.model");
const Municipality = require("./municipality/municipality.model");
const PaymentMethod = require("./payment-method/payment-method.model");
const UnitMeasure = require("./unit-measure/unit-measure.model");
const ShippingType = require("./shipping-type/shipping-type.model");
const Vehicle = require("./vehicle/vehicle.model");
const SeatRuler = require("./seat-ruler/seat-ruler.model");
const Admin = require("./admin/admin.model");
const Coordinator = require("./coordinator/coordinator.model");
const Driver = require("./driver/driver.model");
const Seller = require("./seller/seller.model");
const Client = require("./client/client.model");
const Functionality = require("./functionality/functionality.model");
const DriverVehicle = require("./driver-vehicle/driver-vehicle.model");
const Travel = require("./travel/travel.model");
const Route = require("./route/route.model");
const Seat = require("./seat/seat.model");
const ServiceType = require("./service-type/service-type.model");
const Ticket = require("./ticket/ticket.model");
const Invoice = require("./invoice/invoice.model");
const Bank = require('./bank/bank.model')
const Observation = require('./observation/observation.model');
const PaymentMethodBank = require('./payment-method-bank/payment-method-bank.model')
const Headquarter = require('./headquarter/headquarter.model')
const Shipping = require('./shipping/shipping.model');
const ShipmentTracking = require('./shipment-tracking/shipment-tracking.model')
const TrackingStatus = require('./tracking-status/tracking-status.model')
const MoneyTransfer = require('./money-transfer/money-transfer.model')
const Prefix = require('./prefix/prefix.model')
const Resolution = require('./resolution/resolution.model')
const MoneyTransferTracker = require('./money-transfer-tracker/money-transfer-tracker.model')
const Country = require('./country/country.model')
const BloodType = require('./bloodType/bloodType.model')
const LicenseCategory = require('./licenseCategory/licenseCategory.model')

// Relationships BD

// Relationship User-Admin
Admin.belongsTo(User, { as: 'UserAdmin', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Admin, { as: 'UserAdmin', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
// Relationship User-Client
Client.belongsTo(User, { as: 'UserClient', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Client, { as: 'UserClient', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship User-Driver
Driver.belongsTo(User, { as: 'UserDriver', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Driver, { as: 'UserDriver', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship Vehicle-DriverVehicle
Vehicle.hasMany(DriverVehicle, { as: 'Vehicle', foreignKey: { name: 'idVehicle', allowNull: false, primaryKey: true } });
DriverVehicle.belongsTo(Vehicle, { as: 'Vehicle', foreignKey: { name: 'idVehicle', allowNull: false, primaryKey: true } });

// Relationship Driver-DriverVehicle
Driver.hasMany(DriverVehicle, { as: 'Driver', foreignKey: { name: 'idDriver', allowNull: false, primaryKey: true } });
DriverVehicle.belongsTo(Driver, { as: 'Driver', foreignKey: { name: 'idDriver', allowNull: false, primaryKey: true } });

// Relationship DriverVehicle-Travel
Travel.belongsTo(DriverVehicle, { as: 'TravelDriverVehicle', foreignKey: { name: "idDriverVehicle", allowNull: false } });
DriverVehicle.hasMany(Travel, { as: 'TravelDriverVehicle', foreignKey: { name: "idDriverVehicle", allowNull: false } });

// Relationship BloodType-Driver
Driver.belongsTo(BloodType, { as: 'BloodTypeDriver', foreignKey: { name: 'idBloodType', allowNull: false } });
BloodType.hasOne(Driver, { as: 'BloodTypeDriver', foreignKey: { name: 'idBloodType', allowNull: false } });

// Relationship LicenseCategory-Driver
Driver.belongsTo(LicenseCategory, { as: 'LicenseCategoryDriver', foreignKey: { name: 'idLicenseCategory', allowNull: false } });
LicenseCategory.hasOne(Driver, { as: 'LicenseCategoryDriver', foreignKey: { name: 'idLicenseCategory', allowNull: false } });

// Relationship Client-idIndicativePhoneWhatsApp
Client.belongsTo(IndicativeNumber, { as: 'ClientIndicativeNumberWhatsApp', foreignKey: { name: "idIndicativePhoneWhatsApp", allowNull: false } });
IndicativeNumber.hasMany(Client, { as: 'ClientIndicativeNumberWhatsApp', foreignKey: { name: "idIndicativePhoneWhatsApp", allowNull: false } });

// Relationship Client-Municipality
Client.belongsTo(Municipality, { as: 'ClientMunicipality', foreignKey: { name: "idMunicipality", allowNull: true } });
Municipality.hasMany(Client, { as: 'ClientMunicipality', foreignKey: { name: "idMunicipality", allowNull: true } });

// Relationship User-Seller
Seller.belongsTo(User, { as: 'UserSeller', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Seller, { as: 'UserSeller', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship User-Role
User.belongsTo(Role, { as: 'UserRole', foreignKey: { name: "idRole", allowNull: false } });
Role.hasMany(User, { as: 'UserRole', foreignKey: { name: "idRole", allowNull: false } });

// Relationship User-DocumentType
User.belongsTo(DocumentType, { as: 'UserDocumentType', foreignKey: { name: "idDocumentType", allowNull: false } });
DocumentType.hasMany(User, { as: 'UserDocumentType', foreignKey: { name: "idDocumentType", allowNull: false } });

// Relationship User-IndicativeNumber
User.belongsTo(IndicativeNumber, { as: 'UserIndicativePhone', foreignKey: { name: "idIndicativePhone", allowNull: false } });
IndicativeNumber.hasMany(User, { as: 'UserIndicativePhone', foreignKey: { name: "idIndicativePhone", allowNull: false } });

// Relationship User-Coordinator
Coordinator.belongsTo(User, { as: 'UserCoordinator', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Coordinator, { as: 'UserCoordinator', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship Municipality-Department
Municipality.belongsTo(Department, { as: 'MunicipalityDepartment', foreignKey: { name: "idDepartment", allowNull: false } });
Department.hasMany(Municipality, { as: 'MunicipalityDepartment', foreignKey: { name: "idDepartment", allowNull: false } });

// Relationship Department-Country
Department.belongsTo(Country, { as: 'DepartmentCountry', foreignKey: { name: "idCountry", allowNull: false } });
Country.hasMany(Department, { as: 'DepartmentCountry', foreignKey: { name: "idCountry", allowNull: false } });

// Relationship Vehicle-Municipality
Municipality.hasMany(Vehicle, { as: 'VehicleMunicipality', foreignKey: { name: "idMunicipality", allowNull: false } });
Vehicle.belongsTo(Municipality, { as: 'VehicleMunicipality', foreignKey: { name: "idMunicipality", allowNull: false } });

// Relationship SeatRuler-Vehicle
Vehicle.hasMany(SeatRuler, { as: 'SeatRulerVehicle', onDelete: 'CASCADE', foreignKey: { name: "idVehicle", allowNull: false } });
SeatRuler.belongsTo(Vehicle, { as: 'SeatRulerVehicle', foreignKey: { name: "idVehicle", allowNull: false } });

// Relationship Route-MunicipalityDepart
Route.belongsTo(Municipality, { as: 'MunicipalityDepart', foreignKey: { name: 'idMunicipalityDepart', allowNull: false} });
Municipality.hasMany(Route, { as: 'MunicipalityDepart', foreignKey: { name: "idMunicipalityDepart", allowNull: false } });

// Relationship Route-MunicipalityArrive
Route.belongsTo(Municipality, { as: 'MunicipalityArrive', foreignKey: { name: 'idMunicipalityArrive', allowNull: false} });
Municipality.hasMany(Route, { as: 'MunicipalityArrive', foreignKey: { name: "idMunicipalityArrive", allowNull: false } });

// Relationship Travel-Route
Travel.belongsTo(Route, { as: 'TravelRoute', foreignKey: { name: 'idRoute', allowNull: false} });
Route.hasMany(Travel, { as: 'TravelRoute', foreignKey: { name: "idRoute", allowNull: false } });

// Relationship Travel-Seat
Seat.belongsTo(Travel, { as: 'TravelSeat', foreignKey: { name: 'idTravel', allowNull: false} });
Travel.hasMany(Seat, { as: 'TravelSeat', foreignKey: { name: "idTravel", allowNull: false } });

// Relationship Ticket-Seat
Ticket.belongsTo(Seat, { as: 'TicketSeat', foreignKey: { name: 'idSeat', allowNull: false} });
Seat.hasOne(Ticket, { as: 'TicketSeat', foreignKey: { name: "idSeat" } });

// Relationship Ticket-Invoice
Ticket.belongsTo(Invoice, { as: 'TicketInvoice', foreignKey: { name: 'idInvoice', allowNull: true} });
Invoice.hasMany(Ticket, { as: 'TicketInvoice', foreignKey: { name: "idInvoice", allowNull: true } });

// Relationship Invoice-ServiceType
Invoice.belongsTo(ServiceType, { as: 'InvoiceServiceType', foreignKey: { name: 'idServiceType', allowNull: false} });
ServiceType.hasMany(Invoice, { as: 'InvoiceServiceType', foreignKey: { name: "idServiceType", allowNull: false } });

// Relationship Invoice-Seller
Invoice.belongsTo(Seller, { as: 'InvoiceSeller', foreignKey: { name: 'idSeller', allowNull: false} });
Seller.hasMany(Invoice, { as: 'InvoiceSeller', foreignKey: { name: "idSeller", allowNull: false } });

// Relationship Bank-Seller
Seller.belongsTo(Bank,{ as: 'BankSeller', foreignKey: { name: 'idBank', allowNull: false}})
Bank.hasMany(Seller, { as: 'BankSeller', foreignKey: { name: "idBank", allowNull: false } } )

// Relationship Invoice-PaymentMethod
Invoice.belongsTo(PaymentMethod, { as: 'InvoicePaymentMethod', foreignKey: { name: 'idPaymentMethod', allowNull: false} });
PaymentMethod.hasMany(Invoice, { as: 'InvoicePaymentMethod', foreignKey: { name: "idPaymentMethod", allowNull: false } });

// Relationship Invoice-Client
Invoice.belongsTo(Client, { as: 'InvoiceClient', foreignKey: { name: 'idClient', allowNull: false} });
Client.hasMany(Invoice, { as: 'InvoiceClient', foreignKey: { name: "idClient", allowNull: false } });

// Relationship Observation-Invoice
Observation.belongsTo(Invoice, { as: 'ObservationInvoice', foreignKey: { name: 'idInvoice', allowNull: false} });
Invoice.hasMany(Observation, { as: 'ObservationInvoice', foreignKey: { name: "idInvoice", allowNull: false } });

// Relationship PaymentMethod-PaymentMethodBank
PaymentMethod.hasMany(PaymentMethodBank, { as: 'PaymentMethodBank', foreignKey: { name: 'idPaymentMethod', allowNull: false } });
PaymentMethodBank.belongsTo(PaymentMethod, { as: 'PaymentMethodBank', foreignKey: { name: 'idPaymentMethod', allowNull: false } });

// Relationship Bank-PaymentMethodBank
PaymentMethodBank.belongsTo(Bank, { as: 'BankPaymentMethod', foreignKey: { name: "idBank", allowNull: false } });
Bank.hasMany(PaymentMethodBank, { as: 'BankPaymentMethod', foreignKey: { name: "idBank", allowNull: false } });

// Relationship UnitMeasure-Shipping
UnitMeasure.hasMany(Shipping, { as: 'UnitMeasureShipping', foreignKey: { name: 'idUnitMeasure', allowNull: false } })
Shipping.belongsTo(UnitMeasure, { as: 'UnitMeasureShipping', foreignKey: { name: 'idUnitMeasure', allowNull: false } })

// Relationship ShippingType-Shipping
ShippingType.hasMany(Shipping, { as: 'ShippingTypeShipping', foreignKey: { name: 'idShippingType', allowNull: false } })
Shipping.belongsTo(ShippingType, { as: 'ShippingTypeShipping', foreignKey: { name: 'idShippingType', allowNull: false } })

// Relationship Client-Shipping
Client.hasMany(Shipping, { as: 'ClientShipping', foreignKey: { name: 'idClientReceives', allowNull: false } })
Shipping.belongsTo(Client, { as: 'ClientShipping', foreignKey: { name: 'idClientReceives', allowNull: false } })

// Relationship Invoice-Shipping
Invoice.hasMany(Shipping, { as: 'InvoiceShipping', foreignKey: { name: 'idInvoice', allowNull: false } })
Shipping.belongsTo(Invoice, { as: 'InvoiceShipping', foreignKey: { name: 'idInvoice', allowNull: false } })

// Relationship Shipping-ShipmentTracking
Shipping.hasMany(ShipmentTracking, { as: 'ShippingShipmentTracking', foreignKey: { name: 'idShipping', allowNull: false } })
ShipmentTracking.belongsTo(Shipping, { as: 'ShippingShipmentTracking', foreignKey: { name: 'idShipping', allowNull: false } })

// Relationship TrackingStatus-ShipmentTracking
TrackingStatus.hasMany(ShipmentTracking, { as: 'TrackingStatusShipmentTracking', foreignKey: { name: 'idTrackingStatus', allowNull: false } })
ShipmentTracking.belongsTo(TrackingStatus, { as: 'TrackingStatusShipmentTracking', foreignKey: { name: 'idTrackingStatus', allowNull: false } })

// Relationship MoneyTransfer-Invoice
Invoice.hasOne(MoneyTransfer, { as: 'MoneyTransferInvoice', foreignKey: { name: 'idInvoice', allowNull: false } })
MoneyTransfer.belongsTo(Invoice, { as: 'MoneyTransferInvoice', foreignKey: { name: 'idInvoice', allowNull: false } })

// Relationship MoneyTransfer-Client
Client.hasMany(MoneyTransfer, { as: 'MoneyTransferClient', foreignKey: { name: 'idClientReceives', allowNull: false } })
MoneyTransfer.belongsTo(Client, { as: 'MoneyTransferClient', foreignKey: { name: 'idClientReceives', allowNull: false } })

// Relationship MoneyTransferTracker-MoneyTransfer
MoneyTransfer.hasOne(MoneyTransferTracker, { as: 'MoneyTransferTrackerMoneyTransfer', foreignKey: { name: 'idMoneyTransfer', allowNull: false } })
MoneyTransferTracker.belongsTo(MoneyTransfer, { as: 'MoneyTransferTrackerMoneyTransfer', foreignKey: { name: 'idMoneyTransfer', allowNull: false } })

// Relationship MoneyTransferTracker-TrackingStatus
TrackingStatus.hasMany(MoneyTransferTracker, { as: 'MoneyTransferTrackerTrackingStatus', foreignKey: { name: 'idTrackingStatus', allowNull: false } })
MoneyTransferTracker.belongsTo(TrackingStatus, { as: 'MoneyTransferTrackerTrackingStatus', foreignKey: { name: 'idTrackingStatus', allowNull: false } })

// Relationship Headquarter-Prefix
Headquarter.hasMany(Prefix, { as: 'HeadquarterPrefix', foreignKey: { name: 'idHeadquarter', allowNull: false } })
Prefix.belongsTo(Headquarter, { as: 'HeadquarterPrefix', foreignKey: { name: 'idHeadquarter', allowNull: false } })

// Relationship Bank-Prefix
Bank.hasMany(Prefix, { as: 'BankPrefix', foreignKey: { name: 'idBank', allowNull: false } })
Prefix.belongsTo(Bank, { as: 'BankPrefix', foreignKey: { name: 'idBank', allowNull: false } })

// Relationship ServiceType-Prefix
ServiceType.hasMany(Prefix, { as: 'ServiceTypePrefix', foreignKey: { name: 'idServiceType', allowNull: false } })
Prefix.belongsTo(ServiceType, { as: 'ServiceTypePrefix', foreignKey: { name: 'idServiceType', allowNull: false } })

// Relationship Municipality-Headquarter
Municipality.hasMany(Headquarter, { as: 'MunicipalityHeadquarter', foreignKey: { name: 'idMunicipality', allowNull: false } });
Headquarter.belongsTo(Municipality, { as: 'MunicipalityHeadquarter', foreignKey: { name: 'idMunicipality', allowNull: false } });

// Relationship Prefix-Resolution
Prefix.hasOne(Resolution, { as: 'PrefixResolution', foreignKey: { name: 'idPrefix', allowNull: false } });
Resolution.belongsTo(Prefix, { as: 'PrefixResolution', foreignKey: { name: 'idPrefix', allowNull: false } });

// Relationship Route-Resolution
Route.hasMany(Resolution, { as: 'RouteResolution', foreignKey: { name: 'idRoute', allowNull: false } });
Resolution.belongsTo(Route, { as: 'RouteResolution', foreignKey: { name: 'idRoute', allowNull: false } });

// Relationship Municipality-Resolution
Municipality.hasMany(Bank, { as: 'MunicipalityBank', foreignKey: { name: 'idMunicipality', allowNull: false } });
Bank.belongsTo(Municipality, { as: 'MunicipalityBank', foreignKey: { name: 'idMunicipality', allowNull: false } });

// Relationship Resolution-Invoice
Resolution.hasMany(Invoice, { as: 'ResolutionInvoice', foreignKey: { name: 'idResolution', allowNull: false } });
Invoice.belongsTo(Resolution, { as: 'ResolutionInvoice', foreignKey: { name: 'idResolution', allowNull: false } });

module.exports = {
  // Aggregates Models
  ServerModel: require("./aggregates/server/server.model"),
  ErrorModel: require("./aggregates/error/error.model"),
  // Models
  User,
  Role,
  DocumentType,
  IndicativeNumber,
  Department,
  Municipality,
  PaymentMethod,
  UnitMeasure,
  ShippingType,
  Vehicle,
  SeatRuler,
  Admin,
  Coordinator,
  Driver,
  Seller,
  Client,
  Functionality,
  DriverVehicle,
  Travel,
  Route,
  Seat,
  ServiceType,
  Ticket,
  Bank,
  Observation,
  PaymentMethodBank,
  Headquarter,
  Invoice,
  Shipping,
  ShipmentTracking,
  TrackingStatus,
  MoneyTransfer,
  Prefix,
  Resolution,
  MoneyTransferTracker,
  Country,
  BloodType,
  LicenseCategory
};
