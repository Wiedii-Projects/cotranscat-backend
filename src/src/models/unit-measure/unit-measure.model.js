// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const UnitMeasureSchema = dbConnectionOptions.define(
    "unitMeasure",
    {
      name: {
        type: DataTypes.STRING(100),
        field: "name",
        required: [true, "The name unit measure is required"],
      },
    },
    {
      tableName: "unitMeasure",
    }
  );
  
  module.exports = UnitMeasureSchema;