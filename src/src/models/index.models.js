const User = require("./user/user.model");
const Role = require("./role/role.model");
const CodeSms = require("./code-sms/code-sms.model");
const DocumentType = require("./document-type/document-type.model");
const CallSign = require("./call-sign/call-sign.model");
const Department = require("./department/department.model");
const Municipality = require("./municipality/municipality.model");

// Relationships BD

// Relationship User-Role
User.belongsTo(Role, { as: 'userRole', foreignKey: { name: "idRole", allowNull: false } });
Role.hasMany(User, { as: 'userRole', foreignKey: { name: "idRole", allowNull: false } });

// Relationship User-DocumentType
User.belongsTo(DocumentType, { as: 'userDocumentType', foreignKey: { name: "documentType", allowNull: false } });
DocumentType.hasMany(User, { as: 'userDocumentType', foreignKey: { name: "documentType", allowNull: false } });

// Relationship User-callSign
User.belongsTo(CallSign, { as: 'userCallSign', foreignKey: { name: "callSign", allowNull: false } });
CallSign.hasMany(User, { as: 'userCallSign', foreignKey: { name: "callSign", allowNull: false } });

// Relationship User-WhatsAppCallSign
User.belongsTo(CallSign, { as: 'WhatsAppCallSign', foreignKey: { name: "callSignWhatsApp", allowNull: false } });
CallSign.hasMany(User, { as: 'WhatsAppCallSign', foreignKey: { name: "callSignWhatsApp", allowNull: false } });

// Relationship User-Municipality
User.belongsTo(Municipality, { as: 'UserMunicipality', foreignKey: { name: "municipality", allowNull: true } });
Municipality.hasMany(User, { as: 'UserMunicipality', foreignKey: { name: "municipality", allowNull: true } });

// Relationship Municipality-Department
Municipality.belongsTo(Department, { as: 'MunicipalityDepartment', foreignKey: { name: "department", allowNull: false } });
Department.hasMany(Municipality, { as: 'MunicipalityDepartment', foreignKey: { name: "department", allowNull: false } });

// Relationship CodeSms-User
CodeSms.belongsTo(User, { foreignKey: { name: "userCode", allowNull: false } });
User.hasMany(CodeSms, { foreignKey: { name: "userCode", allowNull: false } });

module.exports = {
  // Aggregates Models
  ServerModel: require("./aggregates/server/server.model"),
  ErrorModel: require("./aggregates/error/error.model"),
  // Models
  User,
  Role,
  CodeSms,
  DocumentType,
  CallSign,
  Department,
  Municipality
};
