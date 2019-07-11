const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TicketBiletikiSchema = mongoose.Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserBiletiki'
    },
    event: {
        type: String,
        required: true,
    },
    where: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    ticket: String,
    seats: mongoose.Schema.Types.Mixed,
    status: String,
    cashier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserBiletiki'
    },
}, {
    timestamps: true
});

TicketBiletikiSchema.plugin(uniqueValidator);

const TicketBiletiki = mongoose.model('TicketBiletiki', TicketBiletikiSchema);

module.exports = TicketBiletiki;