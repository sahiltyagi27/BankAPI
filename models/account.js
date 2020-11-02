const mongoose = require('mongoose');
const { customer } = require('./customer');

let schema = mongoose.Schema;
let acountSchema = new schema({
    CustomerId: { type: schema.Types.ObjectId, ref: 'customer' },
    Balance: { type: Number, min: 0, required: true },
    Type: { type: String, required: true }
});

let account = mongoose.model('account', acountSchema);

module.exports.account = account;