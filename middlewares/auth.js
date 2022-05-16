require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('authorisation').replace('Bearer ', '');
    if (!token) {
      throw new Errow('Cannot find token');
    }
    const decode = await jwt.verify(token, process.env.JWTTOKENSECRET);

    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
    if (!user) {
      res.status(301);
      throw new Error('Authentication fail');
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = authenticate;
