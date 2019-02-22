const mongoose = require('mongoose');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');



const userBiletikiSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    surname: String,
    phonenumber: String,
    role: String,
    status: String,
    passwordHash: String,
    salt: String,
}, {
    timestamps: true
});

userBiletikiSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        console.log(this._plainPassword, password)
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

userBiletikiSchema.methods.checkPassword = function (password) {
    if (!password) return false;
    if (!this.passwordHash) return false;
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

userBiletikiSchema.plugin(uniqueValidator);

const UserBiletiki = mongoose.model('UserBiletiki', userBiletikiSchema);

module.exports = UserBiletiki;