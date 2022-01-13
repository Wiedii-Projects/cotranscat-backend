const { response } = require("express");
const req = require("express/lib/request");

const isAdminRole = (req, res = response, next) => {


    if(!req.authenticatedUser){
       return res.status(500).json({
           msg: 'Para verificar el rol se debe validar el token primero'
       }) 
    }
    const { rol, name } = req.authenticatedUser
    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ name} no es administrador - No puede hacer esto`
        })
    }

    next()
}
const isRole = (...roles ) => {

    return (req, res = response, next) => {

        if(!req.authenticatedUser){
            return res.status(500).json({
                msg: ' Para verificar el rol se debe validar el token primero'
            }) 
         }
         const { rol } = req.authenticatedUser
         if( !roles.includes(rol)){
             return res.status(401).json({
                 msg: `El servio requiere de uno de los siguientes roles ${roles}`
             })
         }

        next()
    }
}

module.exports = {
    isAdminRole,
    isRole
}