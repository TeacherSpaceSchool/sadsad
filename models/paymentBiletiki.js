const mongoose = require('mongoose');

const PaymentBiletikiSchema = mongoose.Schema({
    wallet: {
        type: String,
        required: true,
    },
   ticket: String,
    ammount: {
        type: Number,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    meta: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});


const PaymentBiletiki = mongoose.model('PaymentBiletiki', PaymentBiletikiSchema);

module.exports = PaymentBiletiki;