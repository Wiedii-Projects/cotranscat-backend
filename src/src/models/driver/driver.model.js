// DB Connections
const {
  dbConnectionOptions,
  saltBcrypt
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

const DriverSchema = dbConnectionOptions.define(
  "driver",
  {
    nickName: {
      type: DataTypes.STRING(100),
      unique: true,
      field: "nickName",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      field: "email",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(75),
      field: "password",
      allowNull: false,
      set(value) {
        // Hash to automatically store encrypted passwords in the database
        this.setDataValue("password", bcryptjs.hashSync(value, saltBcrypt));
      },
    },
  },
  {
    tableName: "driver",
  }
);

DriverSchema.removeAttribute("id");

module.exports = DriverSchema;
