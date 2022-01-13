const  mongoose =require('mongoose');
const { Schema, model } =require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es requerido']
    }

})

module.exports = model('Role', RolSchema); 