require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const admin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(404);
      throw new Error('Access denied. Admin access only');
    }
  } catch (e) {
    next(e);
  }
};
module.exports = admin;
