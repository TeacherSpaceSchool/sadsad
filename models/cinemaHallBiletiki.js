const mongoose = require('mongoose');

const CinemaHallBiletikiSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserBiletiki'
    },
}, {
    timestamps: true
});


const CinemaHallBiletiki = mongoose.model('CinemaHallBiletiki', CinemaHallBiletikiSchema);

module.exports = CinemaHallBiletiki;