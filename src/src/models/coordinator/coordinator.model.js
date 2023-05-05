// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

const CoordinatorSchema = dbConnectionOptions.define(
  "coordinator",
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
        const salt = bcryptjs.genSaltSync();
        this.setDataValue("password", bcryptjs.hashSync(value, salt));
      },
    },
  },
  {
    tableName: "coordinator",
  }
);

CoordinatorSchema.removeAttribute("id");

module.exports = CoordinatorSchema;
