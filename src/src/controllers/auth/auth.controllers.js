const bcryptjs = require("bcryptjs");
const { generateJWT, googleVerify } = require("../../helpers");
const { User, UserGoogle, MessageErrors } = require("../../models");
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

module.exports = {
    login,
    googleSignIn
}