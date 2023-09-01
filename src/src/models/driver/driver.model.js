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
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      field: "dateOfBirth",
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      field: "address",
      allowNull: true,
    },
    licenseNumber: {
      type: DataTypes.STRING(50),
      field: "licenseNumber",
      allowNull: false,
    },
    dateOfLicenseIssuance: {
      type: DataTypes.DATEONLY,
      field: "dateOfLicenseIssuance",
      allowNull: false,
    },
    dateExpirationLicense: {
      type: DataTypes.DATEONLY,
      field: "dateExpirationLicense",
      allowNull: false,
    },
    transitAgency: {
      type: DataTypes.STRING(50),
      field: "transitAgency",
      allowNull: false,
    },
    restriction: {
      type: DataTypes.STRING(100),
      field: "restriction",
      allowNull: true,
    },
    licensePhoto: {
      type: DataTypes.STRING(100),
      field: "licensePhoto",
      defaultValue: "",
    },
    state: {
      type: DataTypes.BOOLEAN,
      field: "state",
      defaultValue: true,
    }
  },
  {
    tableName: "driver",
  }
);

DriverSchema.removeAttribute("id");

module.exports = DriverSchema;
