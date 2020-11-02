const express = require('express');
const { bank } = require('../models/bank');
const { authenticateToken } = require('../routes/userRoutes');
const router = express.Router();

async function getBanks(req, res, next) {
    let doc = await bank.find({});
    // if (!doc) {
    //     let err = new Error('Not found');
    //     err.status = 404;
    //     return next(err);
    //  }
    res.send(doc);
}
async function createBank(req, res, next) {
    let Bank = new bank(req.body);
    await Bank.save(function (err, Bank) {
        if (err) {
            return next(err);
        }
        res.status(201);
        res.json(Bank);
    });
}

async function removeBank(req, res, next) {
    await bank.findByIdAndDelete(req.params.bankId);
    res.send('Bank Removed');
}

//BANK ROUTES
router.get('/', authenticateToken, getBanks);

router.post('/', authenticateToken, createBank);

router.delete('/:bankId', authenticateToken, removeBank);

module.exports = router;