const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../../helpers");
const { User, CodeSms } = require("../../models");
const errors = require('../../errors/errors.json');
const { responseError, responseValid } = require("../../errors/response");
const { createCodeID } = require("../../models/codeSms/query.codeSms");

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
        await CodeSms.deleteMany({ userCode: uid });
        return responseValid(res, null);
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const changePassword = async (req, res) => {
    try {
        const { password, uid } = req.body;
        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync(password, salt);
        const user = await User.findByIdAndUpdate(uid, { password });
        return responseValid(res, {user});
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