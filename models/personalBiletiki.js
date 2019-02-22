const mongoose = require('mongoose');

const PersonalBiletikiSchema = mongoose.Schema({
    contact: {
        type: String,
        required: true,
    },
    whoRu:  {
        type: String,
        required: true,
    },
    whoKg:  {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const PersonalBiletiki = mongoose.model('PersonalBiletiki', PersonalBiletikiSchema);

module.exports = PersonalBiletiki;