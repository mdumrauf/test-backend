const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    avatar: String
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
