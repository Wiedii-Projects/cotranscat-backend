const bcryptjs = require('bcryptjs');
const {response} =require('express');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');
const User = require('../models/user')

const login  = async(req, res = response) => {

    const { email, password } =  req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos - correo'
            })
        }


        //si el usuario esta activo 
        if (!user.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos - Estado: false'
            })
        }


        // verificar contrasenña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos - Password'
            })
        }

        //generar el JWT
        const token  = await generarJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
   
}

const googleSignIn  = async( req, res = response ) => {
    const {id_token} = req.body

    try {
        const {email, name, img} = await googleVerify(id_token)
        let user = await Usuario.findOne({email});

        if (!user){
            const data = {
                name,
                email, 
                password: ':P'
            }
            user =  new Usuario(data)
        }
        res.json({
            msg: 'Todo bien',
            id_token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo validar'
        })
    }
    
}

module.exports = {
    login,
    googleSignIn
}