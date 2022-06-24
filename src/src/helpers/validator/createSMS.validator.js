const { accountSid, authToken, twilioNumber } = require('../../config/index');
const client = require('twilio')(accountSid, authToken);

const createSMS = async (phoneNumber) => {
    const code = await codeSMS();
    client.messages.create({
        body: `Your access code is: ${code}`,
            from: twilioNumber,
            to: phoneNumber
        });
    return code;
}

const codeSMS = async () => {
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000);
    return code;
}

module.exports = {
    createSMS
}