require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./database');
const bc = require('bcrypt');
const app = express();

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/product'));

// PORT
app.listen('5005', (req, res) => {
  console.log('E-COMMERCE SITE IS RUNNING ON PORT 5005');
});
