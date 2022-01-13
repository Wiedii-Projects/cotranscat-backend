const Role = require('../models/role')
const User = require('../models/user')

const isRoleValid  = async (rol = '') => {
    const existRol = await Role.findOne({rol})
    if(!existRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExisting = async (email ='') => {
    const isExisting  = await User.findOne({email})
    if(isExisting){
        throw new Error(`El correo ${email} ya esta registrado en la BD`)
    }
}
const userExisting = async (id) => {
    const isExisting  = await User.findById(id)
    if(!isExisting){
        throw new Error(`El ID ${id} no esta registrado en la BD`)
    }
}

module.exports = {
    isRoleValid,
    emailExisting,
    userExisting
}