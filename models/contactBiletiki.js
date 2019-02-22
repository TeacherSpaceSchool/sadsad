const mongoose = require('mongoose');

const ContactBiletikiSchema = mongoose.Schema({
    coords: {
        type: String,
        required: true,
    },
    cashbox: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    booking: {
        type: String,
        required: true,
    },
    connection: {
        type: String,
        required: true,
    },
    return1: {
        type: String,
        required: true,
    },
    general: {
        type: String,
        required: true,
    },
    cooperation: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const ContactBiletiki = mongoose.model('ContactBiletiki', ContactBiletikiSchema);

module.exports = ContactBiletiki;