const mongoose = require('mongoose');

const EmailBiletikiSchema = mongoose.Schema({
    email:  {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const EmailBiletiki = mongoose.model('EmailBiletiki', EmailBiletikiSchema);

module.exports = EmailBiletiki;