const { Schema, model } = require('mongoose');

const codeSmsSchema = Schema({
    code: {
        type: Number,
    },
    userCode: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user is required']
    }
});

module.exports = model('CodeSms', codeSmsSchema);