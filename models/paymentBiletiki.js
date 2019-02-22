const mongoose = require('mongoose');

const PaymentBiletikiSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserBiletiki'
    },
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
}, {
    timestamps: true
});


const PaymentBiletiki = mongoose.model('PaymentBiletiki', PaymentBiletikiSchema);

module.exports = PaymentBiletiki;