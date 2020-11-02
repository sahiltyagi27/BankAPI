const app = require('./middleware')//coming from middleware.js
const customerRoutes = require('./routes/customerRoutes.js');
const bankRoutes = require('./routes/bankRoutes.js');
const accountRoutes = require('./routes/accountRoutes.js');
const loanRoutes = require('./routes/loanRoutes.js');
const { userRoutes } = require('./routes/userRoutes.js');

app.use('/', userRoutes);
app.use('/Bank', bankRoutes);
app.use('/Customer', customerRoutes);
app.use('/Account', accountRoutes);
app.use('/Loan', loanRoutes);

module.exports = app;//going towards lambda.js