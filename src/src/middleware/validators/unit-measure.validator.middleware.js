// Queries
const { unitMeasureQuery } = require("../../models/index.queries");

module.exports = {
    validateUnitMeasure: async (req, where) => {
        try {
            const [unitMeasure] = await unitMeasureQuery.findUnitMeasureQuery({ where });
            req.body.unitMeasure = unitMeasure;
        } catch (error) {
            req.body.unitMeasure = false;
        }
    }
}

