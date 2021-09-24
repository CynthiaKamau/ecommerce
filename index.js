const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
require("./dbconfig");

dotenv.config();

const PORT = process.env.PORT || 3000;
const cookieOptions = {credentials: true, origin: process.env.URL || '*'};

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Import Routes
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/products');
const collectionRoute = require('./routes/collections');
const roleRoute = require('./routes/roles');
const paymentMethods = require('./routes/payment-methods');
const userAddresses = require('./routes/user-addresses');
const userPayments = require('./routes/user-payments');

//Route Middleware
app.use('/api/auth/', authRoute);
app.use('/api/', productsRoute);
app.use('/api/', collectionRoute);
app.use('/api', roleRoute);
app.use('/api', paymentMethods);
app.use('/api', userAddresses);
app.use('/api', userPayments);

app.listen(PORT, () => console.log('Server up and running'));
