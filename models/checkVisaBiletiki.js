const mongoose = require('mongoose');

const CheckVisaBiletikiSchema = mongoose.Schema({
    wallet: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const CheckVisaBiletiki = mongoose.model('CheckVisaBiletiki', CheckVisaBiletikiSchema);

module.exports = CheckVisaBiletiki;