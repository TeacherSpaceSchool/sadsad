const mongoose = require('mongoose'),
    random = require('mongoose-random');

const AdsBiletikiSchema = mongoose.Schema({
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
    type: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

AdsBiletikiSchema.plugin(random, { path: 'r' });

const AdsBiletiki = mongoose.model('AdsBiletiki', AdsBiletikiSchema);

module.exports = AdsBiletiki;