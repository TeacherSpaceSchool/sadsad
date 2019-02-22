const mongoose = require('mongoose');

const WhereBiletikiSchema = mongoose.Schema({
    nameRu: {
        type: String,
        required: true,
    },
    nameKg:  {
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
    address: {
        type: String,
        required: true,
    },
    coords: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const WhereBiletiki = mongoose.model('WhereBiletiki', WhereBiletikiSchema);

module.exports = WhereBiletiki;