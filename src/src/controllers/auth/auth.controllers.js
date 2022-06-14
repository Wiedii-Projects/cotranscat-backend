const bcryptjs = require("bcryptjs");
const { generateJWT, googleVerify, createSMS } = require("../../helpers");
const { User, UserGoogle, MessageErrors, CodeSms } = require("../../models");
const errors = require('../../errors/errors.json');
const { responseError, responseValid } = require("../../errors/response");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return responseError(res, 400, errors.auth.incorrectCredentials);
        };

        if (!user.state) {
            return responseError(res, 400, errors.auth.userNotExist);
        };

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return responseError(res, 400, errors.auth.incorrectCredentials);
        }

        const token = await generateJWT(user.id);
        return responseValid(res, { user, token });
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const googleSignIn = async (req, res) => {
    const { id_token } = req.body;

    try {
        const { email, name, picture } = await googleVerify(id_token);
        let user = await UserGoogle.findOne({ email });

        if (!user) {
            const data = { name, email, picture, google: true, role: 'USER_ROLE' };
            user = new UserGoogle(data);
            await user.save();
        };

        if (!user.state) {
            return responseError(res, 400, errors.auth.userRemoved);
        };

        const token = await generateJWT(user.id);

        return responseValid(res, { user, token });

    } catch (error) {
        return responseError(res, 500, errors.auth.tokenNotValidate);
    }
};

const validateEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return responseError(res, 400, errors.auth.emailExist);
        }

        if (!user.state) {
            return responseError(res, 400, errors.auth.userNotExist);
        };

        const { id } = user;
        return responseValid(res, { id });

    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const createCode = async (req, res) => {
    const { id } = req.body;
    
    try {
        const user = await User.findById(id);

        const [code] = await Promise.all([
            await createSMS(user.phoneNumber),
            await CodeSms.deleteMany({ user: id })
        ]);

        const codeSMS = new CodeSms({ code: code, userCode: user.id });

        await codeSMS.save();
        return responseValid(res, null);

    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const validateCode = async (req, res) => {
    const { id, code } = req.body;
    
    try {
        const codeSMS = await CodeSms.findOne({ code: code, userCode: id });

        if (!codeSMS) {
            return responseError(res, 400, errors.auth.codeNotValid);
        }

        await CodeSms.deleteMany({ userCode: id });
        return responseValid(res, null);

    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
};

const changePassword = async (req, res) => {
    let { password, passwordConfirm, id } = req.body;

    try {
        if (password !== passwordConfirm) {
            return responseError(res, 400, errors.auth.passwordNotMatch);
        }

        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync(password, salt);
        passwordConfirm = bcryptjs.hashSync(passwordConfirm, salt);

        const user = await User.findByIdAndUpdate(id, { password });
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