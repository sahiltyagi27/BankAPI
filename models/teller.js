const mongoose = require('mongoose');
const { customer } = require('./customer');
const { bank } = require('./bank');

let schema = mongoose.Schema;
let tellerSchema = new schema({
    Name: { type: String, required: true },
    Customers: [{ type: schema.Types.ObjectId, ref: 'customer' }],
    BankId: { type: schema.Types.ObjectId, ref: 'bank' }
});

let teller = mongoose.model('teller', tellerSchema);

module.exports.teller = teller;
