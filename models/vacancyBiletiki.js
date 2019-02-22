const mongoose = require('mongoose');

const VacancyBiletikiSchema = mongoose.Schema({
    nameRu: {
        type: String,
        required: true,
    },
    requirementsRu: {
        type: String,
        required: true,
    },
    dutiesRu: {
        type: String,
        required: true,
    },
    conditionsRu: {
        type: String,
        required: true,
    },
    nameKg: {
        type: String,
        required: true,
    },
    requirementsKg: {
        type: String,
        required: true,
    },
    dutiesKg: {
        type: String,
        required: true,
    },
    conditionsKg: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const VacancyBiletiki = mongoose.model('VacancyBiletiki', VacancyBiletikiSchema);

module.exports = VacancyBiletiki;