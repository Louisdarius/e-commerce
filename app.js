require('dotenv').config();
const express = require('express');
const os = require('os');
const cors = require('cors');
const database = require('./database');
const bc = require('bcrypt');
app = express();

// Temporal Imports
const Product = require('./models/product');
const admin = require('./middlewares/admin');
const auth = require('./middlewares/auth');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('WELCOME TO E-COMMERCE'));
app.post('/test', auth, admin, (req, res) => res.json(req.user));

app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/product'));

app.listen(process.env.PORT, () =>
  console.log('SERVING YOUR APP ON PORT 5005')
);
