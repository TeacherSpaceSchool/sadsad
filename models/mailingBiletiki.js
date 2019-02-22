const mongoose = require('mongoose');

const MailingBiletikiSchema = mongoose.Schema({
    mailuser: {
        type: String,
        required: true,
    },
    mailpass: {
        type: String,
        required: true,
    },
    mailchimpInstance: {
        type: String,
        required: true,
    },
    listUniqueId: {
        type: String,
        required: true,
    },
    mailchimpApiKey: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const MailingBiletiki = mongoose.model('MailingBiletiki', MailingBiletikiSchema);

module.exports = MailingBiletiki;