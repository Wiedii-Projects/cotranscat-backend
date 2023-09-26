// Queries
const { sharedHelpers } = require('../../helpers/index.helpers');
const templateVehicleQuery = require('../../models/template-vehicle/templateVehicle.query');
const { vehicleQuery, typeVehicleQuery, typeFuelQuery, typeBodyworkQuery, ownerQuery } = require('./../../models/index.queries')

module.exports = {
    validateVehicle: async (req, query) => {
        try {
            const [vehicle] = await vehicleQuery.findVehicles(query)
            req.body.vehicle = vehicle
        } catch (error) {
            req.body.vehicle = true;
        }
    },
    validateTypeVehicle: async (value, req) => {
        try {
            const id = sharedHelpers.decryptIdDataBase(value)
            const [typeVehicle] = id && await typeVehicleQuery.findTypeVehicleQuery({ where: { id } })||[null];
            req.body.idTypeVehicle = typeVehicle && id;
        } catch {
            req.body.idTypeVehicle = null;
        }
    },
    validateTypeFuel: async (value, req) => {
        try {
            const id = sharedHelpers.decryptIdDataBase(value)
            const [typeFuel] = id && await typeFuelQuery.findTypeFuelQuery({ where: { id } })||[null];
            req.body.idTypeFuel = typeFuel && id;
        } catch {
            req.body.idTypeFuel = null;
        }
    },
    validateTypeBodywork: async (value, req) => {
        try {
            const id = sharedHelpers.decryptIdDataBase(value)
            const [typeBodywork] = id && await typeBodyworkQuery.findTypeBodyworkQuery({ where: { id } })||[null];
            req.body.idTypeBodywork = typeBodywork && id;
        } catch {
            req.body.idTypeBodywork = null;
        }
    },
    validateTemplateVehicle: async (value, req) => {
        try {
            const id = sharedHelpers.decryptIdDataBase(value)
            const [templateVehicle = null] = id && await templateVehicleQuery.findTemplateVehicleQuery({ where: { id } })||[null];
            req.body.idTemplateVehicle = templateVehicle && id;
        } catch {
            req.body.idTemplateVehicle = null;
        }
    },
    validateOwner: async (value, req) => {
        try {
            const id = sharedHelpers.decryptIdDataBase(value)
            const [owner = null] = id && await ownerQuery.findOwnerQuery({ where: { id } }) || [null];
            req.body.idOwner = owner && id;
        } catch {
            req.body.idOwner = null;
        }
    }
}