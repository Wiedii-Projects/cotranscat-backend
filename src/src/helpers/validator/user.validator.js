
const { getUser, getUserID, getUserIdState, emailExists, createNewUser } = require('../../models/user/query.user');
const bcryptjs = require("bcryptjs");
const { createUser, getUserGoogle, emailGoogleExists, getUserGoogleID } = require('../../models/userGoogle/query.userGoogle');
const { googleVerify } = require('../googleVerify.helpers');
const { getCode } = require('../../models/codeSms/query.codeSms');
const { isValidRole } = require('../../models/role/query.role');

const showUser = async(value, req) => {
    req.body.user = await getUser(value);
}

const showUserGoogle = async(value, req) => {
    req.body.userGoogle = await getUserGoogle(value);
}

const showUserID = async(value, req) => {
    req.body.user = undefined;
    req.body.user = await getUserID(value);
}

const showUserGoogleID = async(value, req) => {
    req.body.user = await getUserGoogleID(value)||req.body.user;
}

const showUserIdState = async(value, req) => {
    req.body.user = await getUserIdState(value);
}

const showUserGoogleIdState = async(value, req) => {
    req.body.user = await getUserIdState(value)||req.body.user;
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

const validEmailExists = async(email, req) => {
    req.body.user = await emailExists(email);
    req.body.userGoogle = await emailGoogleExists (email);
    req.body.validUser = (req.body.user||req.body.userGoogle);
}

const validRole = async(role, req) => {
    req.body.validRole = await isValidRole(role) ? true : false;
}

const createUserModelUser = async(req) => {
    const { name, lastName, email, password, phoneNumber, role } = req.body;
    return await createNewUser({ name, lastName, email, password, phoneNumber, role });
}

const extractUserData = async(req) => {
    const { _id, password, name, email, google, lastName, socialStratification, identificationNumber, dateBirth, phoneNumber, ...body } = req.body;
    req.body.dataUpdate = { _id, password, email, google, name, lastName, socialStratification, identificationNumber, dateBirth, phoneNumber };
}

const encryptPassword = async(password) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

module.exports = {
    validPassword,
    showUser,
    validUserGoogle,
    showUserGoogle,
    createUserGoogle,
    showUserID,
    validCode,
    validPasswordRules,
    showUserIdState,
    showUserGoogleIdState,
    validEmailExists,
    validRole,
    createUserModelUser,
    showUserGoogleID,
    extractUserData,
    encryptPassword
}