const mongoose = require('mongoose');

const AboutBiletikiSchema = mongoose.Schema({
    descriptionRu: {
        type: String,
        required: true,
    },
    descriptionKg: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


const AboutBiletiki = mongoose.model('AboutBiletiki', AboutBiletikiSchema);

module.exports = AboutBiletiki;