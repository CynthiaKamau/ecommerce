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

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/',productsRoute );

app.listen(PORT, () => console.log('Server up and running'));
