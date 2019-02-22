const mongoose = require('mongoose');

const PhoneBiletikiSchema = mongoose.Schema({
    phone:  {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const PhoneBiletiki = mongoose.model('PhoneBiletiki', PhoneBiletikiSchema);

module.exports = PhoneBiletiki;