const { response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validarJWT = async (req, res = response,next) => {

    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const {uid} =jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const authenticatedUser = await User.findById(uid)
        
        if(!authenticatedUser){
            return res.status(401).json({
                msg: 'Token no valido - Usuario no encontrado '
            })
        }
        
        //verificar si user esta habilitado

        if(!authenticatedUser.estado){
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado: false '
            })
        }


        req.authenticatedUser = authenticatedUser

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }

    

}

module.exports = {
    validarJWT
}