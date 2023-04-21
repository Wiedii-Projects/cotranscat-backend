// Constants
const { errorsConst, codeSMSConst, coreConfigurationsConst } = require('../constants/index.constants')

// Libraries
const client = require('twilio')(coreConfigurationsConst.accountSid, coreConfigurationsConst.authToken);

const codeSMSHelper = async () => {
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000);
    return code;
}

module.exports = {
    createSMSHelper: async (phoneNumber) => {
        const code = await codeSMSHelper();
        try {
            client.messages.create({
                body: `${codeSMSConst.SMS_CODE_MESSAGE} ${code}`,
                from: coreConfigurationsConst.twilioNumber,
                to: phoneNumber
            }).catch( (error) => console.log(error));
            return code;
        } catch {
            throw errorsConst.codeSms.queryErrors.createError
        }
    }
}