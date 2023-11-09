// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const PrefixManifestSchema = dbConnectionOptions.define(
  "prefixManifest",
  {
    code: {
      type: DataTypes.STRING(3),
      field: "code",
      required: [true, "The name prefix manifest is required"],
    },
    idHeadquarter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "headquarter",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }
  },
  {
    tableName: "prefixManifest",
  }
);

module.exports = PrefixManifestSchema;