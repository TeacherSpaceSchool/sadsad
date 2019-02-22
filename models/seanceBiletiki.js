const mongoose = require('mongoose');

const SeanceBiletikiSchema = mongoose.Schema({
    realDate: {
        type: Date,
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieBiletiki'
    },
    price: {
        type: String,
        required: true,
    },
    seats: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    cinema: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const SeanceBiletiki = mongoose.model('SeanceBiletiki', SeanceBiletikiSchema);

module.exports = SeanceBiletiki;