const mongoose = require('mongoose');

const MovieBiletikiSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    ageCategory: {
        type: String,
        required: true,
    },
    premier: {
        type: String,
        required: true,
    },
    producers: {
        type: String,
        required: true,
    },
    actors: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imageThumbnail: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const MovieBiletiki = mongoose.model('MovieBiletiki', MovieBiletikiSchema);

module.exports = MovieBiletiki;