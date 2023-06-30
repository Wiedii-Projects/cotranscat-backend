// Constants
const { errorsConst } = require("../../constants/index.constants");
const { encryptIdDataBase } = require("../../helpers/shared.helpers");


// Helpers


// Models
const { Bank, Municipality, Headquarter } = require("../index.models");

module.exports = {
    findBankQuery: async (query = {}) => {
        const { where } = query;
        try {
            const banksFound = await Bank.findAll({
                where,
                raw: true,
                nest: true
            });
            const banks = banksFound.map(({ id, ...otherDataBank }) => ({
                id: encryptIdDataBase(id),
                otherDataBank
            }))
            
            return banks
        } catch {
            throw errorsConst.bankErrors.queryErrors.findAllError
        }
    },
    findBankAssociatedByHeadquarterQuery: async (codeBank, idHeadquarter) => {
        try {
            const [bankAssociatedByHeadquarter] = await Bank.findAll({
                where: {
                    code: codeBank
                },
                include: [
                    {
                        model: Municipality,
                        as: 'MunicipalityBank',
                        include: [
                            {
                                model: Headquarter,
                                as: 'MunicipalityHeadquarter',
                                where: {
                                    id: idHeadquarter
                                }
                            }
                        ]
                    }
                ],
                raw: true,
                nest: true
            });
            const { MunicipalityBank: { id, name, MunicipalityHeadquarter: { description } } } = bankAssociatedByHeadquarter
            return {
                id: encryptIdDataBase(id),
                name,
                description
            }
        } catch {
            throw errorsConst.bankErrors.queryErrors.findBankAssociatedByHeadquarterError
        }
    }
}
