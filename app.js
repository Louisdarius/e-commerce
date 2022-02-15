require('dotenv').config();

const express = require('express'),
  cors = require('cors'),
  database = require('./database'),
  bc = require('bcrypt');
app = express();

// Temporal imports

const User = require('./models/user');

const ronaldo = new User({
  firstName: 'Cristiano',
  lastName: 'Ronaldo',
  email: 'CR7@manu.com',
  password: 'manu',
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('WELCOME TO E-COMMERCE'));
app.use('/user', require('./routes/user'));

app.listen(process.env.PORT, () =>
  console.log('SERVING YOUR APP ON PORT 5005')
);
