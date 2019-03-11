const mongoose = require('mongoose'),
    random = require('mongoose-random');

const EventBiletikiSchema = mongoose.Schema({
    nameRu: {
        type: String,
        required: true,
    },
    nameKg:  {
        type: String,
        required: true,
    },
    realDate: {
        type: [Date],
        required: true,
    },
    popular: {
        type: String,
        required: true,
    },
    active: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    descriptionRu: {
        type: String,
        required: true,
    },
    descriptionKg: {
        type: String,
        required: true,
    },
    where: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
},
    date: {
        type: [String],
        required: true,
},
    video: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    imageThumbnail: {
        type: String,
        required: true,
    },
    ageCategory: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

EventBiletikiSchema.plugin(random, { path: 'r' });

const EventBiletiki = mongoose.model('EventBiletiki', EventBiletikiSchema);

module.exports = EventBiletiki;