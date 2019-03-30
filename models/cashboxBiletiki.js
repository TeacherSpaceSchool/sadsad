const mongoose = require('mongoose');

const CashboxBiletikiSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    geo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const CashboxBiletiki = mongoose.model('CashboxBiletiki', CashboxBiletikiSchema);

module.exports = CashboxBiletiki;