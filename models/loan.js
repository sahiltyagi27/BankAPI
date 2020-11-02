const mongoose = require('mongoose');
const { account } = require('./account');
const { customer } = require('./customer');

let schema = mongoose.Schema;
let loanSchema = new schema({
    Type: { type: String, required: true },
    Amount: { type: Number, required: true },
    Tenure: { type: Number, min: 1, required: true },
    AccountId: { type: schema.Types.ObjectId, ref: 'account' },
    CustomerId: { type: schema.Types.ObjectId, ref: 'customer' }
});

let loan = mongoose.model('loan', loanSchema);

module.exports.loan = loan;