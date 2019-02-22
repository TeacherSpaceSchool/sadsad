const mongoose = require('mongoose');

const LogoBiletikiSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    imageThumbnail: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const LogoBiletiki = mongoose.model('LogoBiletiki', LogoBiletikiSchema);

module.exports = LogoBiletiki;