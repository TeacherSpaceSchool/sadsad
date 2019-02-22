const mongoose = require('mongoose'),
    random = require('mongoose-random');

const BillboardBiletikiSchema = mongoose.Schema({
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
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventBiletiki'
    },
}, {
    timestamps: true
});

BillboardBiletikiSchema.plugin(random, { path: 'r' });

const BillboardBiletiki = mongoose.model('BillboardBiletiki', BillboardBiletikiSchema);

module.exports = BillboardBiletiki;