const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../routes/userRoutes');
const { customer } = require('../models/customer');
const { bank } = require('../models/bank');

async function generalEnquiry(req, res, next) {
    let doc = await customer.findById(req.params.customerId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    res.send(doc);
}

async function createCustomer(req, res, next) {
    let Customer = new customer(req.body);
    let doc = await bank.findById(req.params.bankId);
    Customer.BankId = req.params.bankId;
    await Customer.save();
    doc.Customers.push(Customer._id);
    await doc.save();
    res.send(Customer);
}

async function removeCustomer(req, res, next) {
    let doc = await bank.findById(req.params.bankId);
    let cust = await customer.findByIdAndDelete(req.params.customerId);
    let index = await doc.Customers.indexOf(req.params.customerId);
    await doc.Customers.splice(index, 1);
    await doc.save();
    res.send('Customer Removed');
}

//CUSTOMER ROUTES

/**WHEN TESTING IN POSTMAN USE -> 'localhost:3000/Customer/' for nodejs
 * WHEN TESTING IN POSTMAN USE -> 'localhost:3000/dev/Customer/' for lambda functions.
 * FOR MORE DETAILS REFER -> 'app.js'
*/
router.get('/:bankId/:customerId', authenticateToken, generalEnquiry);

router.post('/:bankId', authenticateToken, createCustomer);

router.delete('/:bankId/:customerId', authenticateToken, removeCustomer);



module.exports = router;