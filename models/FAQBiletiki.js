const mongoose = require('mongoose');

const FAQBiletikiSchema = mongoose.Schema({
    questionRu: {
        type: String,
        required: true,
    },
    answerRu: {
        type: String,
        required: true,
    },
    questionKg: {
        type: String,
        required: true,
    },
    answerKg: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const FAQBiletiki = mongoose.model('FAQBiletiki', FAQBiletikiSchema);

module.exports = FAQBiletiki;