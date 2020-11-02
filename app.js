//IMPORTING IMPORTANT MODULES
const express = require('express');
const app = express();
const  connectDb  = require('./models/connection');
connectDb();
module.exports = app;//going towards middleware.js
