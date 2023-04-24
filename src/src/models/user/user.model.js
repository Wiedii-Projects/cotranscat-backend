// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");


const UserSchema = dbConnectionOptions.define(
  "User",
  {
    numberDocument: {
      type: DataTypes.STRING(20),
      unique: true,
      field: "numberDocument",
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      field: "lastName",
      allowNull: false
    },
    numberPhone: {
      type: DataTypes.STRING(12),
      field: "phoneNumber",
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      field: "state",
      defaultValue: true,
      allowNull: false
    },
  },
  {
    tableName: "user",
  }
);

module.exports = UserSchema;
