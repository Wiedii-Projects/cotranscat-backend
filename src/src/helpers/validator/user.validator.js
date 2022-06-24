
const { getUser, getUserID } = require('../../models/user/query.user');
const bcryptjs = require("bcryptjs");
const { createUser, getUserGoogle } = require('../../models/userGoogle/query.userGoogle');
const { googleVerify } = require('../googleVerify.helpers');
const { getCode } = require('../../models/codeSms/query.codeSms');

const showUser = async(value, req) => {
    req.body.user = await getUser(value);
}

const showUserGoogle = async(value, req) => {
    req.body.userGoogle = await getUserGoogle(value);
}

const showUserID = async(value, req) => {
    req.body.user = await getUserID(value);
}

const validPassword = async(value, password, req) => {
    req.body.validPassword = await bcryptjs.compareSync( value, password );
}

const validUserGoogle = async(id_token, req) => {
    try {
        const { email, name, picture } = await googleVerify(id_token);
        req.body.email = email;
        req.body.name = name;
        req.body.picture = picture;
    } catch (error) {
        req.body.noVerify = false;
    }
}

const createUserGoogle = async(req) => {
    const {name, email, picture, google= true, role= 'USER_ROLE'} = req.body;
    await createUser({name, email, picture, google, role});
}

const validCode = async(code, req) => {
    req.body.validCode = await getCode(code, req.body.uid);
}

const validPasswordRules = async(password = '', req) => {
     if(req.body.validPasswordRules!==false){
        req.body.validPasswordRules = !(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/)===null);
     }
}

module.exports = {
    validPassword,
    showUser,
    validUserGoogle,
    showUserGoogle,
    createUserGoogle,
    showUserID,
    validCode,
    validPasswordRules
}