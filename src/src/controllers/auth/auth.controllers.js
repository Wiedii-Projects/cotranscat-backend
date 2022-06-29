const { generateJWT } = require("../../helpers");
const errors = require('../../errors/errors.json');
const { responseError, responseValid } = require("../../errors/response");
const { createCodeID, deleteAllCode } = require("../../models/codeSms/query.codeSms");
const { encryptPassword } = require("../../helpers/validator/user.validator");
const { updateDataUser } = require("../../models/user/query.user");

const login = async (req, res) => {
    try {
        const { user } = req.body;
        const token = await generateJWT(user.id);
        return responseValid(res, { user, token });
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const googleSignIn = async (req, res) => {
    try {
        const { user } = req.body;
        const token = await generateJWT(user.id);
        return responseValid(res, { user, token });
    } catch (error) {
        return responseError(res, 500, errors.auth.tokenNotValidate);
    }
};

const validateEmail = async (req, res) => {
    try {
        const { user, userGoogle } = req.body;
        return responseValid(res, userGoogle||user);
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const createCode = async (req, res) => {
    try {
        await createCodeID(req.body.user);
        return responseValid(res, null);
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const validateCode = async (req, res) => {
    try {
        const { uid } = req.body;
        await deleteAllCode(uid);
        return responseValid(res, null);
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const changePassword = async (req, res) => {
    try {
        const { password, uid } = req.body;
        const passwordEncrypt = await encryptPassword(password);
        updateDataUser(uid, {password: passwordEncrypt});
        return responseValid(res, null);
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};


module.exports = {
    login,
    googleSignIn,
    validateEmail,
    createCode,
    validateCode,
    changePassword
}