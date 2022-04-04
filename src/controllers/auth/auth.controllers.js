const bcryptjs = require("bcryptjs");
const { generateJWT, googleVerify } = require("../../helpers");
const { User, UserGoogle } = require("../../models");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: 'Incorrect email or password'
            })
        };

        if (!user.state) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: 'User does not exist'
            })
        };

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                status: false,
                data: null,
                errors: 'Incorrect email or password'
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
            errors: 'Something went wrong'
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
                errors: 'User removed'
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
            errors: 'Token could not validate'
        })
    }
};

module.exports = {
    login,
    googleSignIn
}