const mongoose = require('mongoose');

const SocialBiletikiSchema = mongoose.Schema({
    name: {
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
    },
    url: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const SocialBiletiki = mongoose.model('SocialBiletiki', SocialBiletikiSchema);

module.exports = SocialBiletiki;