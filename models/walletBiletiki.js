const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const WalletBiletikiSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserBiletiki'
    },
    wallet: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

WalletBiletikiSchema.plugin(uniqueValidator);

const WalletBiletiki = mongoose.model('WalletBiletiki', WalletBiletikiSchema);

module.exports = WalletBiletiki;