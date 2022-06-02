const bcryptjs = require("bcryptjs");
const { generateJWT, googleVerify, createSMS } = require("../../helpers");
const { User, UserGoogle, MessageErrors, CodeSms } = require("../../models");
const errors = require('../../errors/errors.json');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {

            return res.status(400).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.auth.incorrectCredentials)
            })
        };

        if (!user.state) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.auth.userNotExist)
            })
        };

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.auth.incorrectCredentials)
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            status: true,
            data: { user, token },
            errors: null

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.auth.somethingWentWrong)
        })
    }
};

const googleSignIn = async (req, res) => {
    const { id_token } = req.body;

    try {
        const { email, name, picture } = await googleVerify(id_token);
        let user = await UserGoogle.findOne({ email });

        if (!user) {
            const data = {
                name,
                email,
                picture,
                google: true,
                role: 'USER_ROLE'
            };

            user = new UserGoogle(data);
            await user.save();
        };

        if (!user.state) {
            return res.status(401).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.auth.userRemoved)
            })
        };

        const token = await generateJWT(user.id);

        res.json({
            status: true,
            data: { user, token },
            errors: null
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.auth.tokenNotValidate)
        })
    }
};

const validateEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.auth.emailExist)
            })
        }

        if (!user.state) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.auth.userNotExist)
            })
        };

        const { id } = user;

        res.json({
            status: true,
            data: { id },
            errors: null
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.auth.somethingWentWrong)
        })
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

        return res.status(201).json({
            status: true,
            data: true,
            errors: null
        });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.auth.somethingWentWrong)
        })
    }
};

const validateCode = async (req, res) => {
    const { id, code } = req.body;
    
    try {
        const codeSMS = await CodeSms.findOne({ code: code, userCode: id });

        if (!codeSMS) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.auth.codeNotValid)
            })
        }

        await CodeSms.deleteMany({ userCode: id });

        return res.status(200).json({
            status: true,
            data: true,
            errors: null
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.auth.somethingWentWrong)
        })
    }
};

const changePassword = async (req, res) => {
    let { password, passwordConfirm, id } = req.body;

    try {
        if (password !== passwordConfirm) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: new MessageErrors(errors.auth.passwordNotMatch)
            });
        }

        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync(password, salt);
        passwordConfirm = bcryptjs.hashSync(passwordConfirm, salt);

        const user = await User.findByIdAndUpdate(id, { password });

        res.json({
            status: true,
            data: { user },
            errors: null
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.auth.somethingWentWrong)
        })
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