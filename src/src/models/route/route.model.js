// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const RouteSchema = dbConnectionOptions.define(
    "Route",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id",
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      tableName: "route",
      indexes:[
        {
            unique: true,
            fields:['idMunicipalityDepart','idMunicipalityArrive'],
            name:'uniqueRoute'
        }
      ]
    }
  );
  
  module.exports = RouteSchema;
  