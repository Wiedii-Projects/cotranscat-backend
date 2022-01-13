const {response} =require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const usuariosGet = async(req, res =response ) => {
    const query = {estado: true}
    const { limit = 5, skip = 0 } = req.query

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(skip)
        .limit(Number(limit))
    ])

    res.json({
       total,
       usuarios
    })
}

const usuariosPost = async (req, res) => {

    const {name, email, password,rol } = req.body
    const user = new User({name, email, password,rol}); 
    
    //encriptar la contrasenña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    //guardar en bd
    await user.save()
    res.status(201).json({
        user
    })
}
const usuariosPut = async (req, res) => {
    const {id} = req.params
    const {_id, password, google,email, ...resto} = req.body
    //TODO validar contra bases de datos

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const user= await User.findByIdAndUpdate(id, resto);

    res.json({
        user
    })
}
const usuariosPatch = (req, res) => {
    res.status(201).json({
        msg:'Post API - controlador'
    })
}
const usuariosDelete = async (req, res) => {

    const { id } = req.params

    const usuario = await User.findByIdAndUpdate( id, {estado:false} );
  
    res.json({
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}