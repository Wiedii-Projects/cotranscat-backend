// Configuration environment
const { accountSid, authToken, twilioNumber } = require('../config/index');

// Constants
const { errorsConst, codeSMSConst } = require('./../constants/index')

// Libraries
const client = require('twilio')(accountSid, authToken);

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
                from: twilioNumber,
                to: phoneNumber
            });
            return code;
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateCode
        }
    }
}