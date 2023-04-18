const User = require("./user/user.model");
const Role = require("./role/role.model");
const CodeSms = require("./code-sms/code-sms.model");
const DocumentType = require("./document-type/document-type.model");
const IndicativeNumber = require("./indicative-number/indicative-number.model");
const Department = require("./department/department.model");
const Municipality = require("./municipality/municipality.model");

// Relationships BD

// Relationship User-Role
User.belongsTo(Role, { as: 'UserRole', foreignKey: { name: "idRole", allowNull: false } });
Role.hasMany(User, { as: 'UserRole', foreignKey: { name: "idRole", allowNull: false } });

// Relationship User-DocumentType
User.belongsTo(DocumentType, { as: 'UserDocumentType', foreignKey: { name: "idDocumentType", allowNull: false } });
DocumentType.hasMany(User, { as: 'UserDocumentType', foreignKey: { name: "idDocumentType", allowNull: false } });

// Relationship User-IndicativeNumber
User.belongsTo(IndicativeNumber, { as: 'UserIndicativeNumber', foreignKey: { name: "idIndicativeNumberPhone", allowNull: false } });
IndicativeNumber.hasMany(User, { as: 'UserIndicativeNumber', foreignKey: { name: "idIndicativeNumberPhone", allowNull: false } });

// Relationship User-WhatsAppIndicativeNumber
User.belongsTo(IndicativeNumber, { as: 'UserWhatsAppIndicativeNumber', foreignKey: { name: "idIndicativeNumberPhoneWhatsApp", allowNull: false } });
IndicativeNumber.hasMany(User, { as: 'UserWhatsAppIndicativeNumber', foreignKey: { name: "idIndicativeNumberPhoneWhatsApp", allowNull: false } });

// Relationship User-Municipality
User.belongsTo(Municipality, { as: 'UserMunicipality', foreignKey: { name: "idMunicipality", allowNull: true } });
Municipality.hasMany(User, { as: 'UserMunicipality', foreignKey: { name: "idMunicipality", allowNull: true } });

// Relationship Municipality-Department
Municipality.belongsTo(Department, { as: 'MunicipalityDepartment', foreignKey: { name: "idDepartment", allowNull: false } });
Department.hasMany(Municipality, { as: 'MunicipalityDepartment', foreignKey: { name: "idDepartment", allowNull: false } });

// Relationship CodeSms-User
CodeSms.belongsTo(User, { foreignKey: { name: "UserCode", allowNull: false } });
User.hasMany(CodeSms, { foreignKey: { name: "UserCode", allowNull: false } });

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
  Municipality
};
