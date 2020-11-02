const app = require('./app'); //coming from app.js
const bodyParser = require('body-parser');
const morgan = require('morgan');


//SETTING UP EXPRESS MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//LAST MIDDLEWARE FUNCTION TO HANDLE SERVER ERRORS
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
    next();
});

module.exports = app;// going towards routes.js