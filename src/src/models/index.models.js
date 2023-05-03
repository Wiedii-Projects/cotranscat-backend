const User = require("./user/user.model");
const Role = require("./role/role.model");
const CodeSms = require("./code-sms/code-sms.model");
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

// Relationships BD

// Relationship User-Admin
Admin.belongsTo(User, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Admin, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship User-Client
Client.belongsTo(User, { as: 'UserClient', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Client, { as: 'UserClient', foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship User-Driver
Driver.belongsTo(User, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Driver, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship Vehicle-DriverVehicle
Vehicle.hasMany(DriverVehicle, { as: 'Vehicle', foreignKey: { name: 'idVehicle', allowNull: false, primaryKey: true } });
DriverVehicle.belongsTo(Vehicle, { as: 'Vehicle', foreignKey: { name: 'idVehicle', allowNull: false, primaryKey: true } });

// Relationship Driver-DriverVehicle
Driver.hasMany(DriverVehicle, { as: 'Driver', foreignKey: { name: 'idDriver', allowNull: false, primaryKey: true } });
DriverVehicle.belongsTo(Driver, { as: 'Driver', foreignKey: { name: 'idDriver', allowNull: false, primaryKey: true } });

// Relationship DriverVehicle-Travel
DriverVehicle.hasMany(Travel, { as: 'TravelDriverVehicle', foreignKey: { name: "idDriverVehicle", allowNull: false } });
Travel.belongsTo(DriverVehicle, { as: 'TravelDriverVehicle', foreignKey: { name: "idDriverVehicle", allowNull: false }});

// Relationship Client-idIndicativePhoneWhatsApp
Client.belongsTo(IndicativeNumber, { as: 'ClientIndicativeNumberWhatsApp', foreignKey: { name: "idIndicativePhoneWhatsApp", allowNull: false } });
IndicativeNumber.hasMany(Client, { as: 'ClientIndicativeNumberWhatsApp', foreignKey: { name: "idIndicativePhoneWhatsApp", allowNull: false } });

// Relationship Client-Municipality
Client.belongsTo(Municipality, { as: 'ClientMunicipality', foreignKey: { name: "idMunicipality", allowNull: true } });
Municipality.hasMany(Client, { as: 'ClientMunicipality', foreignKey: { name: "idMunicipality", allowNull: true } });

// Relationship User-Seller
Seller.belongsTo(User, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Seller, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

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
Coordinator.belongsTo(User, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Coordinator, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship User-Seller
Seller.belongsTo(User, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });
User.hasOne(Seller, { foreignKey: { name: 'id', allowNull: false, primaryKey: true } });

// Relationship Municipality-Department
Municipality.belongsTo(Department, { as: 'MunicipalityDepartment', foreignKey: { name: "idDepartment", allowNull: false } });
Department.hasMany(Municipality, { as: 'MunicipalityDepartment', foreignKey: { name: "idDepartment", allowNull: false } });

// Relationship Vehicle-Municipality
Municipality.hasMany(Vehicle, { as: 'VehicleMunicipality', foreignKey: { name: "idMunicipality", allowNull: false } });
Vehicle.belongsTo(Municipality, { as: 'VehicleMunicipality', foreignKey: { name: "idMunicipality", allowNull: false } });

// Relationship SeatRuler-Vehicle
Vehicle.hasMany(SeatRuler, { as: 'SeatRulerVehicle', onDelete: 'CASCADE', foreignKey: { name: "idVehicle", allowNull: false } });
SeatRuler.belongsTo(Vehicle, { as: 'SeatRulerVehicle', foreignKey: { name: "idVehicle", allowNull: false } });

// Relationship CodeSms-User
CodeSms.belongsTo(User, { foreignKey: { name: "UserCode", allowNull: false } });
User.hasMany(CodeSms, { foreignKey: { name: "UserCode", allowNull: false } });

// Relationship Route-MunicipalityDepart
Route.belongsTo(Municipality, { as: 'MunicipalityDepart', foreignKey: { name: 'idMunicipalityDepart', allowNull: false} });
Municipality.hasMany(Route, { foreignKey: { name: "idMunicipalityDepart", allowNull: false } });

// Relationship Route-MunicipalityArrive
Route.belongsTo(Municipality, { as: 'MunicipalityArrive', foreignKey: { name: 'idMunicipalityArrive', allowNull: false} });
Municipality.hasMany(Route, { foreignKey: { name: "idMunicipalityArrive", allowNull: false } });

// Relationship Travel-Route
Travel.belongsTo(Route, { foreignKey: { name: 'idRoute', allowNull: false} });
Route.hasMany(Travel, { foreignKey: { name: "idRoute", allowNull: false } });

module.exports = {
  // Aggregates Models
  ServerModel: require("./aggregates/server/server.model"),
  ErrorModel: require("./aggregates/error/error.model"),
  // Models
  User,
  Role,
  CodeSms,
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
  Route
};
