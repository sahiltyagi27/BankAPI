const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../routes/userRoutes');
const { customer } = require('../models/customer');
const { account } = require('../models/account');

async function generalEnquiry(req, res, next) {
    let doc = await account.findById(req.params.accountId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    res.send(doc);
}

async function openAccount(req, res, next) {
    let acc = new account(req.body);
    let doc = await customer.findById(req.params.customerId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    acc.CustomerId = req.params.customerId;
    await acc.save();
    doc.Accounts.push(acc._id);
    await doc.save();
    res.send(acc);
}
async function closeAccount(req, res, next) {
    let doc = await customer.findById(req.params.customerId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    let cust = await account.findByIdAndDelete(req.params.accountId);
    let index = await doc.Accounts.indexOf(req.params.accountId);
    await doc.Accounts.splice(index, 1);
    await doc.save();
    res.send('Account Removed');
}

async function withdrawMoney(req, res, next) {
    let b = 0;
    let doc = await account.findById(req.params.accountId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    let amount = req.params.amount;
    if (doc.Balance >= amount) {
        b = doc.Balance - amount;
        doc.Balance = b;
        doc.save();
        res.send(doc);
    } else {
        let err = new Error('Insufficient Balance');
        err.status = 400;
        next(err);
    }
}

async function depositMoney(req, res, next) {
    let doc = await account.findById(req.params.accountId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    let amount = req.params.amount;
    doc.Balance = parseInt(doc.Balance) + parseInt(amount);
    await doc.save();
    res.send(doc);
}

//ACCOUNT ROUTES
/**WHEN TESTING IN POSTMAN USE -> 'localhost:3000/Account/' for nodejs
 * WHEN TESTING IN POSTMAN USE -> 'localhost:3000/dev/Account/' for lambda functions. 
 * FOR MORE DETAILS REFER -> 'app.js'
*/
router.get('/:customerId/:accountId', authenticateToken, generalEnquiry);

router.post('/:customerId', authenticateToken, openAccount);

router.put('/:accountId/withdraw/:amount', authenticateToken, withdrawMoney);

router.put('/:accountId/deposit/:amount', authenticateToken, depositMoney);

router.delete('/:customerId/:accountId', authenticateToken, closeAccount);


module.exports = router;