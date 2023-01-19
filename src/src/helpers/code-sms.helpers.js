// Constants
const { errorsConst, codeSMSConst, coreConfigurationsConst } = require('./../constants/index')

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
                from: coreConfigurationsConst.authToken,
                to: phoneNumber
            });
            return code;
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateCode
        }
    }
}