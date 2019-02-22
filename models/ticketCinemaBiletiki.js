const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TicketCinemaBiletikiSchema = mongoose.Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserBiletiki'
    },
    movie: {
        type: String,
        required: true,
    },
    cinema: {
        type: String,
        required: true,
    },
    hall: {
        type: String,
        required: true,
    },
    ticket: {
        type: String,
        required: true,
    },
    seats: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

TicketCinemaBiletikiSchema.plugin(uniqueValidator);

const TicketCinemaBiletiki = mongoose.model('TicketCinemaBiletiki', TicketCinemaBiletikiSchema);

module.exports = TicketCinemaBiletiki;