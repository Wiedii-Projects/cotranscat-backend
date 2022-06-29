const { createSMS } = require("../../helpers/validator/createSMS.validator");
const { CodeSms } = require("../../models");

const createCodeID = async(user) => {
    await CodeSms.deleteMany({ user: user.id });
    const code =  await createSMS(user.phoneNumber);
    const codeSMS = new CodeSms({ code: code, userCode: user.id });
    await codeSMS.save();
}

const getCode = async(code, id) => {
    return await CodeSms.findOne({ code: code, userCode: id });
}

const deleteAllCode = async(userCode) => {
    await CodeSms.deleteMany({ userCode });
}

module.exports = {
    createCodeID,
    getCode,
    deleteAllCode
}