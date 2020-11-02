const mongoose = require('mongoose');
const { teller } = require('./teller');
const { customer } = require('./customer');

let schema = mongoose.Schema;
let bankSchema = new schema({
    Name: { type: String, required: true },
    Location: { type: String, required: true },
    Customers: [{ type: schema.Types.ObjectId, ref: 'customer' }],
    Tellers: [{ type: schema.Types.ObjectId, ref: 'teller' }]
});

let bank = mongoose.model('bank', bankSchema);

module.exports.bank = bank;