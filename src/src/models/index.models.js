const User = require("./user/user.model");
const Role = require("./role/role.model");
const UserGoogle = require("./user-google/user-google.model");
const CodeSms = require("./code-sms/code-sms.model");

// Relationships BD

// Relationship User-Role
User.belongsTo(Role, { foreignKey: { name: "role", allowNull: false } });
Role.hasMany(User, { foreignKey: { name: "role", allowNull: false } });

// Relationship UserGoogle-Role
UserGoogle.belongsTo(Role, { foreignKey: { name: "role", allowNull: false } });
Role.hasMany(UserGoogle, { foreignKey: { name: "role", allowNull: false } });

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
  UserGoogle,
  CodeSms,
};
