// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const {
  responseHelpers,
  sharedHelpers,
} = require("../../helpers/index.helpers");

// Libraries
const unicodeNormalizerLibrary = require('unorm')
const { col, fn, where } = require("sequelize");

// Models - Queries
const { userQuery } = require("../../models/index.queries");

module.exports = {
  deleteUser: async (req, res) => {
    const { user } = req.body;
    try {
      const id = sharedHelpers.decryptIdDataBase(user.id);
      const [update] = await userQuery.updateUserQuery(
        { id },
        { state: false }
      );
      return update
        ? responseHelpers.responseSuccess(res, null)
        : responseHelpers.responseError(
            res,
            400,
            errorsConst.userErrors.userNoDelete
          );
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
  searchUsers: async (req, res) => {

    const { name, lastName, numberDocument } = req.body;

    if (!name && !lastName && !numberDocument) return responseHelpers.responseSuccess(res, [])

    const nameWithoutTildes = name ? unicodeNormalizerLibrary.nfd(name).replace(/[\u0300-\u036f]/g, "") : null;
    const lastNameWithoutTildes = lastName ? unicodeNormalizerLibrary.nfd(lastName).replace(/[\u0300-\u036f]/g, "") : null;

    try {
      const usersFound = await userQuery.findUserQuery({
        where: {
          ...(name && {
            name: where(
              fn('LOWER', col('name')),
              'LIKE',
              `%${nameWithoutTildes.toLowerCase()}%`
            )
          }),
          ...(lastName && {
            lastName: where(
              fn('LOWER', col('lastName')),
              'LIKE',
              `%${lastNameWithoutTildes.toLowerCase()}%`
            )
          }),
          ...(numberDocument && { numberDocument })
        },
        include: []
      })

      const users = usersFound.map(
        ({
          id,
          ...user
        }) => ({
          id: sharedHelpers.encryptIdDataBase(id),
          ...user,
        })
      )

      return responseHelpers.responseSuccess(res, users)
    } catch (error) {
      return responseHelpers.responseError(res, 500, error);
    }
  },
};
