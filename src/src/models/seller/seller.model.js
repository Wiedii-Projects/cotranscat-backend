// DB Connections
const {
  dbConnectionOptions,
  saltBcrypt
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

const SellerSchema = dbConnectionOptions.define(
  "seller",
  {
    nickName: {
      type: DataTypes.STRING(100),
      field: "nickName",
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      field: "email",
      allowNull: false,
      unique: true,
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
    tableName: "seller",
    primaryKey: false,
  }
);

SellerSchema.removeAttribute("id");

module.exports = SellerSchema;
