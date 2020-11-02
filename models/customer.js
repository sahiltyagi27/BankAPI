const mongoose = require('mongoose');
const { bank } = require('./bank');
const { account } = require('./account');
const { loan } = require('./loan');
const { teller } = require('./teller');

let schema = mongoose.Schema;
let customerSchema = new schema({
    BankId: { type: schema.Types.ObjectId, ref: 'bank' },
    Name: { type: String, required: true },
    Address: { type: String, required: true },
    PhoneNo: { type: Number, required: true },
    Accounts: [{ type: schema.Types.ObjectId, ref: 'account' }],
    Loans: [{ type: schema.Types.ObjectId, ref: 'loan' }],
    Tellers: [{ type: schema.Types.ObjectId, ref: 'teller' }]
});

let customer = mongoose.model('customer', customerSchema);

module.exports.customer = customer;