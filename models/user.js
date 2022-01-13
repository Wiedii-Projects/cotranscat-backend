const  mongoose =require('mongoose');
const { Schema, model } =require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'La nombre es obligatorio'],
        unique: false
    },

    email: {
        type: String,
        required: [true, 'La correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },



})
UserSchema.methods.toJSON = function(){
    const {__v,password, _id, ...user} = this.toObject();
    user.uid = _id
    return user
}

module.exports = model('User', UserSchema); 