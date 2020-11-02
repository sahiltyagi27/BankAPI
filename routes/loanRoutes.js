const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../routes/userRoutes');
const customer = require('../models/customer');
const loan = require('../models/loan');

async function getDetails(req, res, next) {
    let doc = await loan.findById(req.params.loanId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    res.send(doc);
}

async function applyForLoan(req, res, next) {
    let doc = await customer.findById(req.params.customerId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    let Loan = new loan(req.body);
    Loan.AccountId = req.params.accountId;
    Loan.CustomerId = req.params.customerId;
    await Loan.save();
    await doc.Loans.push(Loan._id);
    await doc.save();
    res.send(Loan);
}

async function removeLoan(req, res, next) {
    let doc = await customer.findById(req.params.customerId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    let Loan = await loan.findByIdAndDelete(req.params.loanId);
    let index = await doc.Loans.indexOf(req.params.loanId);
    await doc.Loans.splice(index, 1);
    await doc.save();
    res.send('Loan removed');
}


//LOAN ROUTES
/**WHEN TESTING IN POSTMAN USE -> 'localhost:3000/Loan/' for nodejs
 * WHEN TESTING IN POSTMAN USE -> 'localhost:3000/dev/Loan/' for lambda functions. 
 * FOR MORE DETAILS REFER -> 'app.js'
*/
router.get('/:customerId/:accountId/:loanId', authenticateToken, getDetails);
router.post('/:customerId/:accountId/', authenticateToken, applyForLoan);
router.delete('/:customerId/:accountId/:loanId', authenticateToken, removeLoan);

module.exports = router;