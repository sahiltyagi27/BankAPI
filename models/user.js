const mongoose = require('mongoose');
let schema = mongoose.Schema;
let userSchema = new schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

let user = mongoose.model('user', userSchema);

module.exports.user = user;