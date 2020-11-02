const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const router = express.Router();


async function createUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = { "username": req.body.username, "password": hashedPassword };
        let User = new user(data);
        await User.save();
        res.send(req.body);
    } catch (error) {
        next(error);
    }

}

async function loginUser(req, res, next) {
    let doc = await user.findOne({ username: req.body.username });
    if (doc == null) {
        res.status(400).send(`Couldn't find`);
    }
    try {
        if (await bcrypt.compare(req.body.password, doc.password)) {
            const User = { name: req.body.username };
            const accessToken = jwt.sign(User, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' });
            res.json({ accessToken: accessToken, expiresIn: '600s' });
        }
        else {
            res.send(`Password didn't match`);
        }
    } catch (error) {
        next(error);
    }
}

async function authenticateToken(req, res, next) {
    if (req.headers.accesstoken == null) {
        res.sendStatus(401);
    }
    jwt.verify(req.headers.accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            next(err);
        }
        next();
    });
}
router.post('/Signup', createUser);
router.post('/Login', loginUser);



module.exports.userRoutes = router;
module.exports.authenticateToken = authenticateToken;